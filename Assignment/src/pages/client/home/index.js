import Header from "@/components/header";
import Content from "./home";
import Footer from "@/components/footer";

const index = () => {
  return `
    ${Header()}
    ${Content()}
    ${Footer()}
  `;
};

export default index;
