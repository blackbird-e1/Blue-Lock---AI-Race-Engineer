type F1PartCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function F1PartCard({
  title,
  description,
  image,
}: F1PartCardProps) {
  return (
    <div
        className="
        bg-[#161616]
        border
        border-[#2e2e2e]
        rounded-2xl
        overflow-hidden
        w-[320px]
        hover:border-[#e10600]
        transition-all
        duration-300
        cursor-pointer
        "
    >
        <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        />

        <div className="p-5">
        <h3 className="text-white text-xl font-semibold mb-2">
            {title}
        </h3>

        <p className="text-gray-400 text-sm">
            {description}
        </p>
        </div>
    </div>
    );
}