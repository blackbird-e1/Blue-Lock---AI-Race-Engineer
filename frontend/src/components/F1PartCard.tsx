type F1PartCardProps = {
  title: string;
  description: string;
  image: string;
  category: string;
  metric: string;
  details: string;
};

export default function F1PartCard({
  title,
  description,
  image,
  category,
  metric,
  details,
}: F1PartCardProps) {
  return (
    <div
      className="
        group
        bg-[#161616]
        border
        border-[#2e2e2e]
        rounded-2xl
        overflow-hidden
        w-[320px]
        hover:border-[#e10600]
        hover:scale-105
        hover:-translate-y-2
        transition-all
        duration-300
        cursor-pointer
      "
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full
            h-48
            object-cover
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-xl font-semibold">
            {title}
          </h3>

          <span
            className="
              text-xs
              px-2
              py-1
              rounded-full
              bg-red-500/10
              text-red-400
            "
          >
            {category}
          </span>
        </div>

        <p className="text-gray-400 text-sm">
          {description}
        </p>

        <div className="mt-4">
          <span className="text-green-400 text-sm font-semibold">
            {metric}
          </span>
        </div>

        <div
          className="
            max-h-0
            overflow-hidden
            transition-all
            duration-300
            group-hover:max-h-24
          "
        >
          <p className="text-gray-500 text-sm mt-3">
            {details}
          </p>
        </div>
      </div>
    </div>
  );
}