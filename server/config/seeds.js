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
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, veritatis. Rerum, quis.",
      //   image: "cookie-tin.jpg",
      beanAuthor: "Jane Doe",
      category: categories[0]._id,
      donation: 100,
    },
    {
      title: "Spread local flower seeds",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, veritatis. Rerum, quis.",
      //   image: "cookie-tin.jpg",
      category: categories[1]._id,
      beanAuthor: "Jane Doe",
      donation: 40,
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
  });

  console.log("users seeded");

  process.exit();
});
