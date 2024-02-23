import Header from "@/components/header";
import Content from "./detail";
import Footer from "@/components/footer";

const index = ({ id }) => {
  return `
    ${Header()}
    ${Content(id)}
    ${Footer()}
  `;
};

export default index;
