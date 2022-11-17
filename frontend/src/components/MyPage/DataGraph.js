import { ResponsiveRadar } from "@nivo/radar";
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";

const DataGraph = () => {
  const [count, setCount] = useState(0)
  // const [fiveGameInfo, setFiveGameInfo] = useState({});
  // const [oneGameInfo, setOneGameInfo] = useState({});
  const [data, setData] = useState([
    {
      "status": "체력",
      "최근 1경기": '',
      "최근 5경기": '',
    },
    {
      "status": "스피드",
      "최근 1경기": '',
      "최근 5경기": '',
    },
    {
      "status": "피지컬",
      "최근 1경기": '',
      "최근 5경기": '',
    },
    {
      "status": "이동거리",
      "최근 1경기": '',
      "최근 5경기": '',
    },
    {
      "status": "공격력",
      "최근 1경기": '',
      "최근 5경기": '',
    },
    {
      "status": "수비력",
      "최근 1경기": '',
      "최근 5경기": '',
    }
  ])

  const [isLoading, setIsLoading] = useState(false);

  const getGameInfoOne = async () => {
    await axios
      .post(`http://k7b307.p.ssafy.io/api/v1/usergame/mygame/stat`, {
        start: 0,
        end: 1,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);

          setData([
            {
              "status": "체력",
              "최근 1경기": res.data.avgStamina,
              "최근 5경기": res.data.avgStamina,
            },
            {
              "status": "스피드",
              "최근 1경기": res.data.avgSpeed,
              "최근 5경기": res.data.avgStamina,
            },
            {
              "status": "피지컬",
              "최근 1경기": res.data.avgPhysical,
              "최근 5경기": res.data.avgStamina,
            },
            {
              "status": "이동거리",
              "최근 1경기": res.data.avgDistance,
              "최근 5경기": res.data.avgStamina,
            },
            {
              "status": "공격력",
              "최근 1경기": res.data.avgAttack,
              "최근 5경기": res.data.avgStamina,
            },
            {
              "status": "수비력",
              "최근 1경기": res.data.avgDefence,
              "최근 5경기": res.data.avgStamina,
            }
          ])
          setCount(count + 1)
        }
      });
  };
  const getGameInfoFive = async () => {
    await axios
      .post(`http://k7b307.p.ssafy.io/api/v1/usergame/mygame/stat`, {
        start: 0,
        end: 5
      })
      .then((res) => {
        if (res.status === 200) {
          const qqqq = [res.data.avgStamina, res.data.avgSpeed, res.data.avgPhysical, res.data.avgDistance, res.data.avgAttack, res.data.avgDefence]
          const arr = ["체력", "스피드", "피지컬", "이동거리", "공격력", "수비력"]
          console.log(res.data);
          let newkeywords = data.map((k) => {
            if ("체력" === k["status"]) {
              return {
                ...k,
                "최근 5경기": res.data.avgStamina,
              };
            }
            else if ("스피드" === k["status"]) {
              return {
                ...k,
                "최근 5경기": res.data.avgSpeed,
              };
            }
            else if ("피지컬" === k["status"]) {
              return {
                ...k,
                "최근 5경기": res.data.avgPhysical,
              };
            }
            else if ("이동거리" === k["status"]) {
              return {
                ...k,
                "최근 5경기": res.data.avgDistance,
              };
            }
            else if ("공격력" === k["status"]) {
              return {
                ...k,
                "최근 5경기": res.data.avgAttack,
              };
            }
            else if ("수비력" === k["status"]) {
              return {
                ...k,
                "최근 5경기": res.data.avgDefence,
              };
            }
            else {
              return {
                k
              }
            }
          });
          // console.log('newkeywords', newkeywords);

          setData(newkeywords);
        }
      })
  }


  useEffect(() => {
    if (count < 2) {
      getGameInfoOne();
      const a = () => {
        setTimeout(() => getGameInfoFive(), 100);
      }
      a()
      return () => clearTimeout(a)
    }
    console.log('zzzz', data)
    // getGameInfoFive();
  }, [data]);

  if (!data) {
    return <div>로딩중</div>;
  }
  return (
    // 챠트를 감싸는 div에 style을 지정해주지 않으면 출력이 되지 않는다.
    <div>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <div
          style={{
            width: "90%",
            height: "70%",
            position: "absolute",
            top: "35%",
            transform: "translate(-50%, -5%)",
          }}
        >
          {/* <MyCard /> */}
          <ResponsiveRadar
            data={data}
            keys={["최근 1경기", "최근 5경기"]}
            indexBy="status"
            valueFormat=">-.2f"
            margin={{ top: 180, bottom: 140, right: 70, left: 70 }}
            borderColor={{ from: "color" }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            colors={{ scheme: "pastel1" }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 25,
                itemTextColor: "#999",
                symbolSize: 15,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
            theme={{
              textColor: "#ffffff",
              fontSize: 15,
              axis: {
                domain: {
                  line: {
                    stroke: "#dddddd",
                    strokeWidth: 1,
                  },
                },
                legend: {
                  text: {
                    fontSize: 12,
                    fill: "#333333",
                  },
                },
                ticks: {
                  line: {
                    stroke: "#777777",
                    strokeWidth: 1,
                  },
                  text: {
                    fontSize: 15,
                  },
                },
              },
              tooltip: {
                container: {
                  background: "#ffffff",
                  color: "#333333",
                  fontSize: 16,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DataGraph;
