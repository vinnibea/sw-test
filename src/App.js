import useFetchPeoplePage from './hooks/useFetchPeoplePage';
import Header from './components/Header';
import Main from './components/Main';
import MainCard from './components/MainCard';
import UIButton from './components/UI/UIButton';
import Loader from './components/UI/Loader';
import './index.css'

function App() {
  //infinite scroll query hook
  const {
    data, status, isFetching, fetchNextPage
  } = useFetchPeoplePage()

  return (
    <div className={`App min-h-dvh px-4 pb-4 ${status === 'pending' ? 'flex justify-center items-center pulse relative transition-all duration-700 ease-linear -z-10' : 'flex flex-col gap-16'}`}>

      {status === 'success' ? (
        <>
          <Header></Header>
          <Main>

            {data?.pages?.map((item, i) => {
              return (
                <div key={item.name}>
                  <h2 className="character-title" >
                    {item.name}
                    <span className="italic">#{item.id}</span>
                  </h2>


                  <MainCard character={item}></MainCard>
                </div>)
            })}
            {data.next !== null && (
              <UIButton background={"btn-secondary"} onClick={fetchNextPage} disabled={isFetching}>
                {isFetching ? 'Loading...' : 'Load more'}
              </UIButton>
            )}
          </Main>
        </>
      ) : <Loader></Loader>}
    </div>
  );
}

export default App;
