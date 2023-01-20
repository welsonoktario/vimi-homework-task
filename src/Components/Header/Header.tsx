import "./Header.css";

export type HeaderProps = {
  name: string;
};

export const Header = ({ name }: HeaderProps) => {
  return (
    <header>
      <h2>Hello {name}.</h2>
      <h4>
        Here are the list of projects you submitted
      </h4>
    </header>
  );
};
