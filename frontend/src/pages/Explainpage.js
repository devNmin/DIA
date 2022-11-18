import React from 'react';
import MainCarousel from '../components/ExplainPage/MainCarousel';
import styles from './ExplainPage.module.css'
import { Link } from 'react-router-dom';
import logo from '../assets/freelogo.png'
import watch1 from '../assets/watch1.png'
import watch2 from '../assets/watch2.png'
import watch3 from '../assets/watch3.png'
import exe1 from '../assets/exe1.png'
import exe2 from '../assets/exe2.png'

function Explainpage(props) {
	return (
		<div className={styles.body}>
			<div className={styles.explainCarousel}>
				<MainCarousel>
					<div className={styles.explain}>
						<h1>DIA 완벽 가이드</h1>
						<p style={{color: 'yellowgreen', marginTop: 15}}>Directing Assistant를 사용하기 위해 필요한 작업들</p>
						<img className={styles.logoimage} src={logo} alt="#" />
					</div>
					{/* 카메라 세팅 */}
					<div className={styles.explain}>
						<h1>삼성 플로우 연결</h1>
						<div className={styles.explainptag}>
							<h3 style={{color: 'yellowgreen'}}>프로그램을 사용하려면 삼성 스마트폰이 필요합니다.</h3>
							<br></br>
							<p>1. Microsoft Store에서 삼성 플로우 앱을 설치합니다.</p>
							<p>2. 스마트폰에서 삼성 플로우를 검색 후 설치합니다.</p>
							<p>3. PC와 스마트폰을 삼성 플로우를 사용하여 연결합니다</p>
						</div>
						<div className={styles.droidimage}>
							<img src="https://k.kakaocdn.net/dn/oVW9C/btrpiHwupKi/ZvqcGt0m2az80HSV478bHK/img.png" alt="#" />
							<img src="https://k.kakaocdn.net/dn/bhTKjW/btrpmfTxhMo/Tc8yS7uTRRmRPl3kQU3ya0/img.jpg" alt="#" />
							<img src="https://k.kakaocdn.net/dn/bpuSFu/btrpoyyuWz4/P05QnPufCkLXFylXWVxpj1/img.jpg" alt="#" />
						</div>
						<br></br>
						<br></br>
							<a href="https://www.notion.so/d29289a9f99a45e78000dd24e58cb18e">설치에 관한 자세한 설명은 여기서 확인해주세요</a>
					</div>
					{/* 노트북 프로그램 세팅 */}
					<div className={styles.explain}>
						<h1>노트북 설정하기</h1>
						<div className={styles.explainptag}>
							<p>1. https://k7b307.p.ssafy.io/ 에서 DIA.exe를 다운 받습니다.</p>
							<p>2. 다운 받은 DIA.exe 파일을 노트북에서 실행 합니다.</p>
							<p>3. 핸드폰에서 보여준 IP 와 PORT를 설정 합니다.</p>
							<p>4. 확인을 누른 후 등록한 카메라의 아이피와 포트를 확인합니다.</p>
							<p>5. 등록한 아이피와 포트가 일치한다면 다음을 눌러줍니다.</p>
							<p>6. 노트북 와이파이의 아이피를 확인합니다.</p>
							<p>7. 노트북 아이피를 태플릿에 입력합니다.</p>
						</div>
						<div className={styles.notebookimage}>
							<img src={exe1} alt="#" />
							<img src={exe2} alt="#" />

						</div>
					</div>
					{/* wear os 설명 */}
					<div className={styles.explain}>
						<h1>갤럭시 워치 설정하기</h1>
						<div className={styles.explainptag}>
							<p>1. Watch 앱을 이용하면 심박수를 이용하여 정확한 체력 측정 및 총 걸음수가 측정이 가능합니다.</p>
							<p>2. 제공하는 apk 파일을 다운로드 받습니다.</p>
							<p>3. 우리 서비스 앱에 있는 태그(EX: #123)를 #을 빼고 입력하면 나의 정보와 연동됩니다.</p>
							<p>4. 측정 시작 버튼을 누르면 심박수, 걸음수가 측정이 되고 심박수는 실시간으로 볼 수 있습니다.</p>
							<p>5. 측정 중지 버튼을 누르면 평균 심박수, 걸음수가 개인정보에 반영됩니다.</p>
						</div>
						<div className={styles.wearosimage}>
							<img src={watch1} alt="#" />
							<img src={watch2} alt='#' />
							<img src={watch3} alt='#' />
						</div>
						<Link to='/register' className={styles.signup}>
							<button type="button">
								회원가입 하러 가기
							</button>
						</Link>
					</div>
				</MainCarousel>
			</div>
		</div>
	);
}

export default Explainpage;