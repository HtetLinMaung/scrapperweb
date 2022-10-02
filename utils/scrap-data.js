import http from "starless-http";
import Swal from "sweetalert2";
import { domain } from "../constants";

export default async function scrapData(body) {
  if (!body.url) {
    return Swal.fire({
      icon: "warning",
      text: "Url is required!",
    });
  }
  const [response, err] = await http.post(`${domain}/scrapper/v1/scrap`, body);
  if (err) {
    Swal.fire({
      icon: "error",
      text: "response" in err ? err.response.data.message : err.message,
    });
    return null;
  }
  return response.data;
}
