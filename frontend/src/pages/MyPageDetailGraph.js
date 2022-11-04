import DataGraphDetail from '../components/MyPage/DataGraphDetail';
import BotNavbar from '../components/Navbar/BotNavbar';

function MyPageDetailGraph(props) {
  const data = [
    {
      "id": "경기1",
      "color": "hsl(342, 70%, 50%)",
      "data": [
        {
          "x": "",
          "y": 0
        },
        {
          "x": "체력",
          "y": 90
        },
        {
          "x": "스피드",
          "y": 90
        },
        {
          "x": "공격력",
          "y": 68
        },
        {
          "x": "수비력",
          "y": 67
        },
        {
          "x": "이동거리",
          "y": 77
        },
        {
          "x": "피지컬",
          "y": 87
        },
        {
          "x": "'",
          "y": 100
        },
      ]
    },
    {
      "id": "경기2",
      "color": "hsl(307, 70%, 50%)",
      "data": [
        {
          "x": "",
          "y": 0
        },
        {
          "x": "체력",
          "y": 78
        },
        {
          "x": "스피드",
          "y": 93
        },
        {
          "x": "공격력",
          "y": 88
        },
        {
          "x": "수비력",
          "y": 67
        },
        {
          "x": "이동거리",
          "y": 44
        },
        {
          "x": "피지컬",
          "y": 67
        },
        {
          "x": "'",
          "y": 100
        },
      ]
    },
    {
      "id": "경기3",
      "color": "hsl(307, 70%, 50%)",
      "data": [
        {
          "x": "",
          "y": 0
        },
        {
          "x": "체력",
          "y": 80
        },
        {
          "x": "스피드",
          "y": 96
        },
        {
          "x": "공격력",
          "y": 89
        },
        {
          "x": "수비력",
          "y": 70
        },
        {
          "x": "이동거리",
          "y": 60
        },
        {
          "x": "피지컬",
          "y": 67
        },
        {
          "x": "'",
          "y": 100
        },
      ]
    },
  ]
  return (
    <div>
      <DataGraphDetail data={data} />
      <BotNavbar />
    </div>
  );
}

export default MyPageDetailGraph;