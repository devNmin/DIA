import React from 'react';
import MainCarousel from '../components/ExplainPage/MainCarousel';
import styles from './ExplainPage.module.css'
import { Link } from 'react-router-dom';
import logo from '../assets/freelogo.png'

function Explainpage(props) {
	return (
		<div className={styles.body}>
			<div className={styles.explainCarousel}>
				<MainCarousel>
					<div className={styles.explain}>
						<h1>DIA 완벽 가이드</h1>
						<p>Directing Assistant를 사용하기 위해 필요한 작업들</p>
						<img className={styles.logoimage} src={logo} alt="#" />
					</div>
					{/* 카메라 세팅 */}
					<div className={styles.explain}>
						<h1>DroidCam 설치</h1>
						<div className={styles.explainptag}>
							<h3 style={{color: 'yellowgreen'}}>프로그램을 사용하려면 PC와 스마트폰이 같은 와이파이로 연결된 상태여야 합니다.</h3>
							<br></br>
							<p>1. 스마트폰에 DroidCam 프로그램(앱)을 설치합니다.</p>
							<p>2. 구글에 DroidCam을 검색 후 설치합니다.</p>
							<p>3. 드로이드캠 앱 설치 후 처음 실행하면 도움이 뜨는데, 하단에 [알겠습니다] 메뉴가 뜰 때까지 진행합니다.</p>
						</div>
						<div className={styles.droidimage}>
							<img src="https://k.kakaocdn.net/dn/bcfQAY/btqZkpGk8Hy/wD6krioKGIdktlhVVaapg0/img.jpg" alt="#" />
							<img src="https://k.kakaocdn.net/dn/bdNfRq/btqZdkGvyyR/MVFnLYYniJg0A0N0gMcoBK/img.jpg" alt="#" />

						</div>
						<br></br>
						<br></br>
							<a href="https://www.notion.so/af7381d882944da592fb104f48aeeef4">설치에 관한 자세한 설명은 여기서 확인해주세요</a>
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
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b22f9613-af45-456b-8592-6e18d814ab2b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221114T004748Z&X-Amz-Expires=86400&X-Amz-Signature=2da2a0a25e9fa6c93d840043af422542af1739dca94994c97ff8862bbfbf6271&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt="#" />
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4c2becc7-c008-4685-9706-92ca49f61b27/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221114T004809Z&X-Amz-Expires=86400&X-Amz-Signature=0e6b247542db830f89b0ce2f0d464b9352e2045ffd905aea5beaa2910a9e9847&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt="#" />

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
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bd026955-4e76-40c5-abb0-d9c10d359bc6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221114T004539Z&X-Amz-Expires=86400&X-Amz-Signature=e46def39759c49c65fe271f8bf7fef924a6089287710130b6e2d6bf0633594f2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt="#" />
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5477e8a1-b9ce-4aa8-97c3-723ea52090d3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221114T004640Z&X-Amz-Expires=86400&X-Amz-Signature=a7e1a976d357ffd89dc942c16eedc00d5f027c784d46b69ba41d48ac10dc1bf7&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt='#' />
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5241c7dd-666c-4fcc-a934-fae7d9c686e9/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221114T004658Z&X-Amz-Expires=86400&X-Amz-Signature=764396de39a817a5caa4d0ccf7f9a804f23e58ea2587628d72114d3e3503c04d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt='#' />
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