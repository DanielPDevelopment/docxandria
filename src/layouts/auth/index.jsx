import Footer from "../../components/footer/FooterAuthDefault";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";
import secure from 'assets/img/secure.svg';

export default function Auth() {
  // Generate route elements based on the provided routes configuration
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="!bg-lightGray">
      <div className="relative float-right h-full min-h-screen w-full !bg-lightGray dark:!bg-gray-light">
        <main className={`mx-auto min-h-screen content-center align-center`}>
          <div className="relative">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full h-full">
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/app"
                    element={<Navigate to="/auth/sign-in" replace />}
                  />
                </Routes>
                <div className="hidden sm:block lg:absolute md:relative right-0 h-full lg:min-h-screen md:min-h-[auto] xs:min-h-[auto] md:block lg:w-[49vw] 2xl:w-[44vw] ">
                  <div className='lg:flex h-full flex flex-wrap items-center lg:min-h-screen md::min-h-[auto] lg:content-center md:content-start xs:content-start'>
                    <div className='mt-2 text-white w-full m-w-[50%] lg:w-auto'>
                      <img
                        src={secure}
                        alt="Sign In Doc Image"
                        className={`md:px-1 px-1 md:h-[400px] h-[auto] hidden 2xl:block`}
                        style={{ width: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
