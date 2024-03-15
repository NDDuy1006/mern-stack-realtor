import { twMerge } from "tailwind-merge"

interface IProps {
  userFirstname: string
  className?: string
}

const DefaultProfileAvatar = (props: IProps) => {
  const letter = Array.from(props.userFirstname)[0]
  return (
    <div className={twMerge(
      "rounded-full text-lg text-secondary-theme text-center bg-slate-500",
      props.className
    )}>
      {letter}
    </div>
  )
}

export default DefaultProfileAvatar