import { ResponsiveRadar } from '@nivo/radar'


const DataGraph = () => {
	const data = [
		{
			"status": "체력",
			"현재": 94,
			"한 달전": 93,
		},
		{
			"status": "스피드",
			"현재": 110,
			"한 달전": 107,
		},
		{
			"status": "피지컬",
			"현재": 100,
			"한 달전": 99,
		},
		{
			"status": "이동거리",
			"현재": 71,
			"한 달전": 65,
		},
		{
			"status": "공격력",
			"현재": 107,
			"한 달전": 109,
		},
		{
			"status": "수비력",
			"현재": 107,
			"한 달전": 100,
		}
	]
	return (
		// 챠트를 감싸는 div에 style을 지정해주지 않으면 출력이 되지 않는다.
		<div style={{ width: '90%', height: '70%', position: 'absolute', top: '35%', transform: 'translate(0%, 0%)' }}>
			{/* <MyCard /> */}
			<ResponsiveRadar
				data={data}
				keys={['현재', '한 달전']}
				indexBy="status"
				valueFormat=">-.2f"
				margin={{ top: 180,  bottom: 140, right:70,left:70}}
				borderColor={{ from: 'color' }}
				gridLabelOffset={36}
				dotSize={10}
				dotColor={{ theme: 'background' }}
				dotBorderWidth={2}
				colors={{ scheme: 'pastel1' }}
				blendMode="multiply"
				motionConfig="wobbly"
				legends={[
					{
						anchor: 'top-left',
						direction: 'column',
						translateX: -50,
						translateY: -40,
						itemWidth: 80,
						itemHeight: 25,
						itemTextColor: '#999',
						symbolSize: 15,
						symbolShape: 'circle',
						effects: [
							{
								on: 'hover',
								style: {
									itemTextColor: '#000',
								
								}
							}
						],
					}
				]}
				theme={{
          textColor: '#ffffff' ,
          fontSize: 15,
          axis: {
            domain: {
              line: {
                stroke: '#dddddd',
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: '#333333',
              },
            },
            ticks: {
              line: {
                stroke: '#777777',
                strokeWidth: 1,
              },
              text: {
                fontSize: 15,
              },
            },
          },
          tooltip: {
            container: {
              background: '#ffffff',
              color: '#333333',
              fontSize: 16,
            },
          },
        }}

			/>
		</div>
	);
}

export default DataGraph;