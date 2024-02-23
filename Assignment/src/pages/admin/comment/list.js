import Layout from "../layout";
import { getData, getDataByID, useEffect } from "@/util";
import API from "@/api";

const Comment_List = () => {
  return Layout(CommentList);
};

function CommentList() {
  return "<div>Comment List</div>";
}

export default Comment_List;
