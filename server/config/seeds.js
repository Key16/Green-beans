const db = require("./connection");
const { User, Bean, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Clean up" },
    { name: "Restoration" },
    { name: "Green Energy" },
    { name: "Other" },
  ]);

  console.log("categories seeded");

  await Bean.deleteMany();

  const bean = await Bean.insertMany([
    {
      title: "Clean up my local river",
      description:
        "There's a river near my place in Hurstville and I've been wanting to gather some local awareness and hopefully help get i cleaned up. Would really like to ge some gloves, bins and tools and some people to come clean it up!",

      beanAuthor: "Jane Doe",
      category: categories[0]._id,
      donation: 100,
      image:
        "https://www.signupgenius.com/cms/images/groups/beach-clean-up-tips-ideas-article-600x400.jpg",
    },
    {
      title: "Spread local flower seeds",
      description:
        "Did you know its actually really easy to help your local bees? Just spread some flower seeds in the local parks or patches of grass. The more bees the better pollination of our plants and thriving nature.  Just make sure the seeds are native and not an invasive species at the store.",

      category: categories[1]._id,
      beanAuthor: "Jane Doe",
      donation: 40,
      image:
        "https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2020/04/20105541/remote-work-environment-earth-day-1024x512.png",
    },
    {
      title: "Make largest compost together",
      description:
        "It's not a dumpster, it's a compost. I got a lot of leftover food from being in a childcare and dont want it to just go to waste. Thought we should just get tgoether and make a big compost for the community",
      category: categories[1]._id,
      beanAuthor: "John Doe",

      image:
        "https://cdn.britannica.com/82/194882-050-C382CFA6/Scraps-plant-matter-compost-bin-garden.jpg",
    },
    {
      title: "Ploggers for life",
      description:
        "I would recommend plogging (jogging whilst picking up trash), to anyone who likes a good jog and wants to do some good. Its free just bring a bag and gloves and a bright mindset you're changing the world",
      category: categories[1]._id,
      beanAuthor: "John Doe",

      image:
        "https://sustainability.ncsu.edu/multisite/wp-content/uploads/2019/03/plogging.jpg",
    },
    //
  ]);

  console.log("beans seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    password: "password12345",
    bean: [bean[0]._id, bean[1]._id],
  });

  await User.create({
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: "password12345",
    bean: [bean[2]._id, bean[3]._id],
  });

  console.log("users seeded");

  process.exit();
});
