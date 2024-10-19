import { ZaboProps } from "../Zabo";

interface ZaboImagesProps extends Pick<ZaboProps, "imageUrls" | "title"> {}

const ZaboImages = ({ title, imageUrls }: ZaboImagesProps) => {
  return (
    <div className={"flex justify-center"}>
      {/* 아래 div에 바로 justify-center를 적용하면, 1번 2번 이미지가 잘려서 보임 */}
      <div className={"flex flex-nowrap gap-[10px] overflow-x-scroll"}>
        {imageUrls.map((url) => (
          <img
            key={url}
            src={url}
            alt={title}
            width={200}
            height={200}
            className={"rounded-[5px] border border-gray-300 object-cover"}
          />
        ))}
      </div>
    </div>
  );
};

export default ZaboImages;
