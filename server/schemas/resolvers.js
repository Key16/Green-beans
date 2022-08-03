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
    bean: async (parent, { beanId }) => {
      return await Bean.findOne({ _id: beanId });
    },

    //find the user
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("bean");

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    //find the users donations but not currently used
    userDonations: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("donation");

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    //find the donations for the bean, not currently used

    beanDonations: async (parent, { _id }) => {
      return await Bean.findById(_id).populate("donaters");
    },
  },
  Mutation: {
    //add a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    //logs the user in checks for pw and email
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
    //create a new bean
    addBean: async (
      parent,
      { title, description, image, donation, beanAuthor },
      context
    ) => {
      if (context.user) {
        const bean = await Bean.create({
          title,
          description,
          image,
          donation,
          beanAuthor,
        });
        //updates the user schema with the bean id
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { bean: bean._id } }
        );

        return bean;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //removes the bean
    removeBean: async (parent, { beanId }, context) => {
      if (context.user) {
        return Bean.findOneAndDelete({ _id: beanId });
      }

      throw new AuthenticationError("Not logged in");
    },
    //adds a donation to the schema, currently not being used
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
