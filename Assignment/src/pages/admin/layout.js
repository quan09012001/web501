import Sidebar from "@/components/sidebar";
import Navi from "@/components/navi";

const layout = (content) => {
  return `
  <article class="admin-content">
    ${Navi()}
    <main class="main-content">
      ${Sidebar()}
      ${content()}
    </main>
  </article>
  `;
};

export default layout;
