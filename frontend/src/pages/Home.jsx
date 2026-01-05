const Home = ({ setPage }) => {
  return (
    <>
      <h1>FreshChoice Home</h1>
      <button onClick={() => setPage("levering")}>Toeleveringsketen</button>
      <button onClick={() => setPage("voorraad")}>Voorraadbeheer</button>
    </>
  );
};

export default Home;
