interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return (
    <div className="rounded-[5px] bg-secondary px-[10px] py-[5px] text-lg text-primary dark:bg-d_secondary">
      #{name}
    </div>
  );
};

export default Tag;
