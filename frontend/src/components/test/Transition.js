import { SwitchTransition,  CSSTransition } from "react-transition-group";
import { Route, Switch, useLocation } from "react-router-dom";
import "./Transition.css";
import TeamMakePage from "../../pages/TeamMakePage";
import IpInsertPage from "../../pages/IpInsertPage";

// const irene =
//   "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-irene.jpg";
// const seulgi =
//   "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-seulgi.jpg";
// const yeri =
//   "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-yeri.jpg";
// const joy =
//   "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-joy.jpg";
// const wendy =
//   "https://raw.githubusercontent.com/baeharam/Redvelvet-Fansite/master/images/about-wendy.jpg";

const Transition = () => {  
//   const PageIrene = <Page image={irene} />;
//  const PageSeulgi = <Page image={seulgi} />;
//   const PageYeri = <Page image={yeri} />;
//   const PageJoy = <Page image={joy} />;
//   const PageWendy = <Page image={wendy} />;

  const location = useLocation();
  const mode = "out-in"

  return (       
    <SwitchTransition  mode={mode} className="transition-group">
      <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
        <Switch location={location}>
          <Route exact path="/teammake">
            <TeamMakePage></TeamMakePage>
          </Route>  
          <Route path="/ipInsert" children={IpInsertPage}>
            <IpInsertPage></IpInsertPage>
          </Route>         
          {/* <Route path="/yeri" children={PageYeri} />
          <Route path="/joy" children={PageJoy} />
          <Route path="/wendy" children={PageWendy} /> */}
        </Switch>
      </CSSTransition>
    </SwitchTransition>
    
  );
};

export default Transition;