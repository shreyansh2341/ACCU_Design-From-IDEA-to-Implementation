// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

// const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

// const UpdatePost = () => {
//   const { id } = useParams();
//   const [form, setForm] = useState({
//     event: '',
//     about: ''
//   });
//   const [mediaImage, setMediaImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//   const fetchPost = async () => {
//     try {
//       const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/media/single-post/${id}`, {
//         withCredentials: true,
//       });
//       const media = data.media;
//       setForm({
//         event: media.event,
//         about: media.about || ''
//       });
//       setImageUrl(media.mediaImage.url);  // <-- Set current image
//     } catch (error) {
//       toast.error("Failed to fetch post.");
//     }
//   };
//   fetchPost();
// }, [id]);


//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//     const handleUpdate = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("event", form.event);
//     formData.append("about", form.about);

//     if (mediaImage) {
//       formData.append("mediaImage", mediaImage);
//     }

//     try {
//       const { data } = await axios.put(
//         `${REACT_APP_BACKEND_URL}/api/media/update-post/${id}`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       toast.success("Post updated successfully!");
//       navigate("/all-posts");
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating post.");
//     }
//   };


//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
//       <h2 className="text-2xl font-bold mb-4 text-center">Update Post</h2>
//       <form onSubmit={handleUpdate} className="space-y-4">
//   <input
//     type="text"
//     name="event"
//     value={form.event}
//     onChange={handleChange}
//     placeholder="Event"
//     className="w-full p-2 border rounded"
//   />
//   <textarea
//     name="about"
//     value={form.about}
//     onChange={handleChange}
//     placeholder="About Blog"
//     className="w-full p-2 border rounded h-32"
//   />

//   {imageUrl && (
//     <div>
//       <p className="font-semibold mb-1">Current Post Image:</p>
//       <img
//         src={imageUrl}
//         alt="Current Post"
//         className="w-full h-64 object-cover rounded border"
//       />
//     </div>
//   )}

//   <input
//     type="file"
//     accept="image/*"
//     onChange={(e) => setMediaImage(e.target.files[0])}
//     className="w-full border p-2 rounded"
//   />

//   <button
//     type="submit"
//     className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//   >
//     Update Post
//   </button>
// </form>

//     </div>
//   );
// };

// export default UpdatePost;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaImages } from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const UpdatePost = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    event: "",
    about: "",
  });
  const [mediaImage, setMediaImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/media/single-post/${id}`,
          {
            withCredentials: true,
          }
        );
        const media = data.media;
        setForm({
          event: media.event,
          about: media.about || "",
        });
        setImageUrl(media.mediaImage.url);
      } catch (error) {
        toast.error("Failed to fetch post.");
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("event", form.event);
    formData.append("about", form.about);

    if (mediaImage) {
      formData.append("mediaImage", mediaImage);
    }

    try {
      await axios.put(
        `${REACT_APP_BACKEND_URL}/api/media/update-post/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Post updated successfully!");
      navigate("/all-posts");
    } catch (error) {
      console.error(error);
      toast.error("Error updating post.");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-[#e6f3fc] to-[#d4eafc]"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 248, 255, 0.6), rgba(230, 243, 252, 0.75)), url("/images/bg-image-getquote.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40">
              <FaImages className="text-white text-lg" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#2479C2]">
                Update Post
              </h2>
              <p className="text-xs text-gray-500">
                Update the event details or replace the media image.
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="event"
              value={form.event}
              onChange={handleChange}
              placeholder="Event"
              className="w-full p-2.5 text-sm border border-blue-100 rounded-xl bg-slate-50/60
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
            />
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="About Post"
              className="w-full p-2.5 text-sm border border-blue-100 rounded-xl bg-slate-50/60 h-32
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 resize-none"
            />

            {imageUrl && (
              <div>
                <p className="font-semibold mb-2 text-sm text-gray-700">
                  Current Post Image:
                </p>
                <img
                  src={imageUrl}
                  alt="Current Post"
                  className="w-full h-64 object-cover rounded-xl border border-blue-100 shadow-sm shadow-slate-200"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMediaImage(e.target.files[0])}
              className="w-full p-2 text-xs border border-blue-100 rounded-xl bg-slate-50/60
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
            />

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-semibold
                         bg-green-600 text-white
                         shadow-[0_10px_25px_rgba(34,197,94,0.55)]
                         hover:bg-green-700
                         hover:-translate-y-[1px] hover:shadow-[0_14px_30px_rgba(34,197,94,0.7)]
                         active:translate-y-0 active:shadow-md
                         transition"
            >
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
