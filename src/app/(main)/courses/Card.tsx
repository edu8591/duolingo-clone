interface CardProps {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
}
export const Card = ({
  id,
  title,
  imageSrc,
  onClick,
  disabled,
  active,
}: CardProps) => {
  return <div className="">Card</div>;
};
