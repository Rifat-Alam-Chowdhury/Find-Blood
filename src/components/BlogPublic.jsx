import React from "react";

const BlogPublic = ({
  imageUrl,
  content,

  title,
}) => {
  return (
    <div className="max-w-sm mx-auto">
      <img src={imageUrl} alt={title} className="rounded-lg h-64 w-full" />
      <div className="mt-4">
        <h3
          className="text-xl font-semibold mt-2"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>

        <p className="text-gray-600 text-sm mt-2">{content}</p>
      </div>
    </div>
  );
};

export default BlogPublic;
