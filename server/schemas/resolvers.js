const { AuthenticationError } = require("apollo-server-express");
const { User, Bean, Category, Donater } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    //find the category
    categories: async () => {
      return await Category.find();
    },

    //find al the beans
    beans: async (parent, { category }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      return await Bean.find(params).populate("category");
    },
    //find a single bean
    bean: async (parent, { _id }) => {
      return await Bean.findById(_id).populate("category");
    },
    //find the user
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("bean");

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    //find the users donations
    userDonations: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("donation");

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    //find the donations for the bean

    beanDonations: async (parent, { _id }) => {
      return await Bean.findById(_id).populate("donaters");
    },
    // //nont sure abobut this yet
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   const order = new Order({ products: args.products });
    //   const line_items = [];

    //   const { products } = await order.populate("products");

    //   for (let i = 0; i < products.length; i++) {
    //     const product = await stripe.products.create({
    //       name: products[i].name,
    //       description: products[i].description,
    //       images: [`${url}/images/${products[i].image}`],
    //     });

    //     const price = await stripe.prices.create({
    //       product: product.id,
    //       unit_amount: products[i].price * 100,
    //       currency: "usd",
    //     });

    //     line_items.push({
    //       price: price.id,
    //       quantity: 1,
    //     });
    // //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ["card"],
    //     line_items,
    //     mode: "payment",
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`,
    //   });

    //   return { session: session.id };
    // },
  },
  Mutation: {
    //add a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addBean: async (
      parent,
      { title, description, image, donation },
      context
    ) => {
      if (context.user) {
        const bean = await Bean.create({
          title,
          description,
          image,
          donation,
          beanAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { bean: bean._id } }
        );

        return bean;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBean: async (parent, { beanId }, context) => {
      if (context.user) {
        return Bean.findOneAndDelete({ _id: beanId });
      }

      throw new AuthenticationError("Not logged in");
    },
    addDonation: async (parent, { donatedAmount, beanId }, context) => {
      if (context.user) {
        const donation = await Donation.create({
          donatedAmount,
          donaterName: context.user.username,
          donaterId: context.user._id,
        });

        //updates the user table to have their donations
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { donation: donation._id } }
        );
        console.log("this has passed user update and before bean update");
        console.log("the bean Id is", beanId);

        //somehow have to pass the bean iD through too
        await Bean.findOneAndUpdate(
          { _id: beanId },
          { $addToSet: { donation: donation._id } }
        );

        return donation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
