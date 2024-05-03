import "./style.css";

type Iprops = {
  account: string | null;
  balance: string | null;
};

function CardPortfolio({ ...props }: Iprops) {
  const { account, balance } = props;

  return (
    <div className="card">
      <h2>Portfolio</h2>
      <h4>Ethereum address</h4>
      <strong>{account}</strong>
      <h4>Ethereum balance</h4>
      <strong>{balance} ETH </strong>
    </div>
  );
}

export default CardPortfolio;
