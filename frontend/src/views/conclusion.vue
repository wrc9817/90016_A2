<template>
  <el-row justify="center" :gutter="0" class="conclusion-body">
    <el-col :span="18">
      <el-row>
        <el-col :span="24">
          <el-card shadow="always">
            <div class="title-wrapper">
              <span class="title">About Us</span>
            </div>
            <div v-for="item in paragraphs" :key="item" class="content-wrapper">
              <span class="content">
                <div class="title">{{ item.title }}</div>
                <div>{{ item.content }}</div>
              </span>
              <div class="img-wrapper">
                <img :src="item.img" class="img" />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      paragraphs: [
        {
          title: "Animal\'s welfare ",
          content:
            "When talking about animal welfare, we often refer to the physical state and mental state of the animal.  An animal’s state can be negative, neutral, or positive. Now many animals in captivity are losing their innate abilities and often develop behavioral abnormalities such as mental stereotypes. Animal welfare is often measured by considering factors such as its health, safety, ability to express innate behaviors, mental health, etc. An animal in good physical condition may also have a mental illness. Captive animals have little control over the environment in which they live due to relatively small, barren enclosures wherein their daily routines are strictly scheduled by human caretakers. ",
          img: require("../assets/img/1.jpg"),
        },
        {
          title: "Community engagement ",
          content:
            "Considering the problems that can arise with animals in captivity, the community is very much involved in working with zoos to build long-term relationships and create meaningful change for the benefit of people and wildlife. To educate the community about the importance of protecting our natural environment for future generations, various conservation programs are ongoing. For example, In Victoria, the last known population of wild Brush-tailed Rock-wallaby is isolated to a single gorge in a remote part of East Gippsland. Therefore, the community is engaged in the annual “HOP FEST” event to increase community care and knowledge of the species and generate support for the conservation projects.",
          img: require("../assets/img/2.jpg"),
        },
        {
          title: "Conservation trends and decisions",
          content:
            "Since the first zoo was founded in 1835, the purpose of zoos and the standard for measuring the survival of animals have evolved. In the beginning, zoos were open to visitors as entertainment places. They were not very good at keeping animals alive. It was not until the first half of the twentieth century that zoos began to focus on the physical health of the animals, such as the absence of disease, successful reproduction, and longevity. In the last two years, in 2018, a newly revised criterion is that zoos must achieve animal welfare. The animals need to be not only physically healthy but also, more importantly, to have the behavioral characteristics of the species. Just as a climber must climb, a runner must run.",
          img: require("../assets/img/3.jpg"),
        },
        {
          title: "The Sixth Mass Extinction ",
          content:
            "Before evaluating the Sixth Mass Extinction (The Holocene Extinction), the first five were inevitably mentioned. Unlike the sixth one, the previous species’ mass extinction events are to some extent mysterious, because we really do not know the causes and have no way of proving them. But we have a very clear idea of the causes of the current changes, this century and several centuries before human activities. Humans have contributed to factors like climate change and the introduction of invasive species, which are leading to even more extinctions as animal habitats disappear or are disrupted by new species. Many of the species going extinct are doing so before they are even identified.",
          img: require("../assets/img/4.jpg"),
        },
      ],
    };
  },
};
</script>

<style scoped>
.conclusion-body {
  padding: 20px 0;
}
.title-wrapper {
  display: flex;
}
.img-wrapper {
  width: 100%;
  flex: 0 1 auto;
  padding: 10px;
}
.img {
  width: 70%;
  height: 70%;
  /* width:250px;
  height:200px; */
}
.title {
  padding: 15px 10px;
  font-size: 32px;
  font-weight: bold;
  display: inline-block;
}
.content-wrapper {
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.content {
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
  flex: 0 0 50%;
  display: inline-block;
  text-align: left;
}
.content .title{
  font-size: 24px;
  font-weight: bold;
  padding:10px 0;
}
/* .img {
  width: 400px;
  height: 300px;
} */
</style>
