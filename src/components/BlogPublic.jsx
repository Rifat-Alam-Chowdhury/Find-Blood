import React from "react";

const BlogPublic = ({
  imageUrl,
  content,

  title,
}) => {
  return (
    <div className="card border-2 border-red-300 rounded-lg ">
      <figure className="h-64 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt="Blog Illustration"
          className="h-full w-full object-cover "
        />
      </figure>
      <div className="p-4">
        <h3
          className="text-xl font-semibold mt-2"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>

        <p
          className="text-gray-600 text-sm mt-2"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      </div>
    </div>
  );
};

export default BlogPublic;
