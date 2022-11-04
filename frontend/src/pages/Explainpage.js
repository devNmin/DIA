import React from 'react';
import MainCarousel from '../components/ExplainPage/MainCarousel';
import styles from './ExplainPage.module.css'

function Explainpage(props) {
	return (
		<div className={styles.body}>
			<div className={styles.explainCarousel}>
				<MainCarousel>
					{/* 카메라 세팅 */}
					<div className={styles.explain}>
						<h1>카메라 세팅하기</h1>
					</div>
					{/* 노트북 프로그램 세팅 */}
					<div className={styles.explain}>
						<h1>노트북 설정하기</h1>
						<p>1. https://k7b307.p.ssafy.io/ 에서 DIA.exe를 다운 받습니다.</p>
						<p>2. 다운 받은 DIA.exe 파일을 노트북에서 실행 합니다.</p>
						<p>3. 핸드폰에서 보여준 IP 와 PORT를 설정 합니다.</p>
						<p>4. 확인을 누른 후 등록한 카메라의 아이피와 포트를 확인합니다.</p>
						<p>5. 등록한 아이피와 포트가 일치한다면 다음을 눌러줍니다.</p>
						<p>6. 노트북 와이파이의 아이피를 확인합니다.</p>
						<p>7. 노트북 아이피를 태플릿에 입력합니다.</p>
						<div className={styles.notebookimage}>
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b22f9613-af45-456b-8592-6e18d814ab2b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221104T060155Z&X-Amz-Expires=86400&X-Amz-Signature=a34f9467f00ffebe285894280cac0fb8d32a736aa87f1c725ed0af0aa24360c3&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt="#" />
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4c2becc7-c008-4685-9706-92ca49f61b27/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221104T061610Z&X-Amz-Expires=86400&X-Amz-Signature=2b910265e162197f66b52a2c2321dbd180f34d5b2841df5038abc3f081734440&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt="#" />
							
						</div>
					</div>
					{/* wear os 설명 */}
					<div className={styles.explain}>
						<h1>갤럭시 워치 설정하기</h1>
						<p>1. Watch 앱을 이용하면 심박수를 이용하여 정확한 체력 측정 및 총 걸음수가 측정이 가능합니다.</p>
						<p>2. 제공하는 apk 파일을 다운로드 받습니다.</p>
						<p>3. 우리 서비스 앱에 있는 태그(EX: #123)를 #을 빼고 입력하면 나의 정보와 연동됩니다.</p>
						<p>4. 측정 시작 버튼을 누르면 심박수, 걸음수가 측정이 되고 심박수는 실시간으로 볼 수 있습니다.</p>
						<p>5. 측정 중지 버튼을 누르면 평균 심박수, 걸음수가 개인정보에 반영됩니다.</p>
						<div className={styles.wearosimage}>
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bd026955-4e76-40c5-abb0-d9c10d359bc6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221104T043239Z&X-Amz-Expires=86400&X-Amz-Signature=3876a6e5f0c87b366faddd0b361ffa72f0d493f29d1732e50c13048cf645f9e4&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt="placeholder" />
							<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5477e8a1-b9ce-4aa8-97c3-723ea52090d3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221104T043831Z&X-Amz-Expires=86400&X-Amz-Signature=7961e918ba34d94c09b1c20df7c4efffa7c6fcd1dc965cd264604573e3b27bfb&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" alt='#' />
							<img src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5241c7dd-666c-4fcc-a934-fae7d9c686e9/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221104T043948Z&X-Amz-Expires=86400&X-Amz-Signature=448100a1669e31671615343940215b6a82af3b4d6e2471a0433c83ee1c1b82e2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject' alt='#' />
						</div>
					</div>
				</MainCarousel>
			</div>
		</div>
	);
}

export default Explainpage;