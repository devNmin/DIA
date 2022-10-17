## 2주차 기획 

# Git 규칙

------

# **Git Commit & Branch**

### **Commit 전략**

- **FEAT** : 새로운 기능 추가
- **FIX** : 버그 수정
- **DOCS** : 문서 수정 및 추가
- **STYLE** : 코드 스타일 관련 변경(코드 포매팅, 세미콜론 누락 등)
- **REFACTOR** : 코드 리팩토링
- **TEST** : 테스트 코드, 리팩토링 테스트 코드 추가
- **CHORE** : 빌드 task 수정, 패키지 매니저 수정(.gitignore 수정 같은 경우)

```bash
git commit -m "[FEAT] create new feature

피처 부가 설명"

# shift enter 2회 치고 부가 설명 작성
```

------

### **Git FLOW**

- **master** : 기준이 되는 브랜치로 제품을 배포하는 브랜치(배포 할 때 )
- **develop** : 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 Merge (버그가 수정된 커밋들)
- **feature** : 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 Merge (기능추가)
- **release** : 배포를 위해 master 브랜치로 보내기 전에 먼저 QA(품질검사)를 하기위한 브랜치 (QA)
- **hotfix** : master 브랜치로 배포를 했는데 버그가 생겼을 떄 긴급 수정하는 브랜치
- feature은 언제나 develop에서 시작되며 기능추가작업이 완료되었다면 develop으로 merge
- 모든 기능이 merge되면 QA진행 QA는 develop에서 release진행 QA후에는 master와 develop으로 merge

![gitflow.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1473e4f2-6a19-4bf4-a99d-07ca672d0ce6/gitflow.png)

------

## **기본 브랜치**

**master**

**develop**

**develop_FE**

**develop_BE**

feature-back/blabla

feature-front/blabla

------

### **기본 설정**

- git flow init -d
  - → error 뜰 시, git stash 후에 다시 git flow init -d
- 각자가 기능을 만들 때

EX) OAuth2기능을 만들고 싶다.

```bash
git flow feature start OAuth2
git flow feature publish OAuth2

하게 되면 feature/OAuth2 라는 이름으로 브랜치가 생성됨

그리고 개발을 하다가
중간 완료가 된다면,

git add .
git commit -m "커밋 메세지"
git push origin feature/OAuth2

위 명령어를 통하여 중간 저장이 가능하며

최종본이 완성되면 코드리뷰를 통하여 문제가 없음이 확인된다면
git flow feature finish OAuth2

명령어를 사용하여 만들었던 feature/OAuth2 를 develop 브랜치로 merge 한 후,

git add .
git commit -m "커밋 메세지"
git push origin develop
```

명령어를 사용하여 merge된 develop 변경사항을 push하여 원격 저장소에 저장

그 후, 기능 개발이 끝난 다음 master에 request merge를 보내고 코드 리뷰로 오류가 없음을 확인 마지막으로 찬이형이 merge 승인 하면 최신 코드인 develop에 있던 코드들이 master로 merge가 됨.

------

### **추가**

git branch <branch name> :  해당 이름으로 branch 생성

git branch -v : 로컬 branch를 최종 커밋내역과 함께 확인

git branch -r : 리모트 branch를 확인

git branch -a  :  모든 branch 확인

git checkout origin <branch name> : 해당 branch로 이동

리모트 branch를 가져오고 싶을 때

```
[특정이름 지정시]
$ git checkout -b work2 origin/work2
[원격 branch 이름을 그대로 사용할 경우]
$ git checkout -t origin/work2
```

**git branch -m (변경할 branch이름) (변경될 branch이름) : branch 이름 변경**