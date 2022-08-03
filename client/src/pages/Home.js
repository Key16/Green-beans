import React from "react";
import { Box, Spacer, Text, Wrap, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Wrap py={20}>
        <Spacer />
        <Box
          width={[
            "100%", // 0-30em
            "35%", // 48em-62em
          ]}
        >
          <img
            src="https://c4.wallpaperflare.com/wallpaper/391/960/943/love-wallpaper-preview.jpg"
            alt="grow a bean"
          />
        </Box>
        <Spacer />
        <Box
          className="homebean"
          width={[
            "100%", // 0-30em

            "30%", // 48em-62em
          ]}
          p="2"
          m="1"
        >
          <Text p="5" fontSize="3xl">
            Kickstart a Green Project Idea as a Green Keen Bean
          </Text>

          <Center>
            <Button size="lg" colorScheme="teal">
              <Link to="/beanform">Grow A Bean</Link>
            </Button>
          </Center>
        </Box>

        <Spacer />
      </Wrap>
      <Wrap className="homebar" py={5}>
        <Box
          className="homebean"
          width={[
            "100%", // 0-30em
          ]}
          m="2"
        >
          <img
            src="https://healingforestdotorg.files.wordpress.com/2020/08/nature-calm.jpg?"
            alt="gather a team"
          />
        </Box>
      </Wrap>
      <Wrap py={20}>
        <Spacer />
        <Box
          className="homebean"
          width={[
            "100%", // 0-30em

            "30%", // 48em-62em
          ]}
          p="1"
        >
          <Text p="5" fontSize="3xl">
            Gather interest or funds for your project and clean up our earth
            together
          </Text>
        </Box>

        <Spacer />
        <Box
          width={[
            "100%", // 0-30em
            "35%", // 48em-62em
          ]}
        >
          <img
            src="https://images.squarespace-cdn.com/content/v1/5ece4458b32b8a7d6b8d3382/1614175087947-Y8NFFG71UP2D45YXV8NT/Green+Earth+Plan_Why+we+do+this_Community+Image?format=1500w"
            alt="gather a team"
          />
        </Box>
        <Spacer />
      </Wrap>
    </div>
  );
};

export default Home;
