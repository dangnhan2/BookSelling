import { useLocation } from "react-router-dom";
import BookDetail from "./BookDetail";
import { getBookWithId } from "../../service/api";
import { useEffect, useState } from "react";
const BookPageDetail = () => {
  const [data, setData] = useState({});
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let id = params?.get("id");
  console.log(id);
  useEffect(() => {
    fetchBook(id);
  }, [id]);

  const fetchBook = async (id) => {
    const res = await getBookWithId(id);
    if (res && res.data) {
      let raw = res.data;
      //process data
      raw.items = getImages(raw);

      setTimeout(() => {
        setData(raw);
      }, 3000);
    }
  };

  const getImages = (raw) => {
    let images = [];
    if (raw.thumbnail) {
      images.push({
        original: `http://localhost:8080/images/book/${raw.thumbnail}`,
        thumbnail: `http://localhost:8080/images/book/${raw.thumbnail}`,
        originalClass: "original-image",
        thumbnailClass: "thumbnail-image",
      });
    }

    if (raw.slider) {
      raw.slider.map((img) => {
        images.push({
          original: `http://localhost:8080/images/book/${img}`,
          thumbnail: `http://localhost:8080/images/book/${img}`,
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image",
        });
      });
    }
    return images;
  };

  return (
    <>
      <BookDetail data={data}></BookDetail>
    </>
  );
};

export default BookPageDetail;
