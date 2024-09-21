# ☕ Beanery
<img src="https://github.com/user-attachments/assets/3a4e5034-bcf3-4beb-816e-9cea478c89e9" alt="main_img" width=60%/>

## 소개
Beanery는 커피 원두를 판매하는 커머스 사이트입니다.<br/>

<br>   

[원두구매하러가기](https://commerce-kappa-coral-63.vercel.app) 
|  | 아이디 | 비밀번호 |
| --- | --- | --- |
| 판매자 | vksaowk@gmail.com | qwer1234 |
| 구매자 | rnaowk@gmail.com | qwer1234 |

<br>   

## 개발 기간
2024.08.19 ~ 현재 진행 중

<br>   

## 기술 스택

###### Environment
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" alt='git_img'> <img src="https://img.shields.io/badge/github-ffffff?style=for-the-badge&logo=github&logoColor=black" alt='github_img'>

###### Config
<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt='yarn_img'> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt='vite_img'>

###### Development
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt='typescript_img'> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt='react_img'> <img src="https://img.shields.io/badge/zustand-0E76FD?style=for-the-badge&logo=zustand&logoColor=black" alt='zustand_img'> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt='reactquery_img'> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt='tailwindcss_img'> <img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=black" alt='supabase_img'>

<br>  

## 주요기능 v1.0.0
<details><summary>로그인/회원가입</summary>
  
###### 로그인
<img src="https://github.com/user-attachments/assets/8b0831d5-d7ca-49fc-8326-d2753b2a9daa" alt="login_img" height=500px/><br> 

###### 회원가입
<img src="https://github.com/user-attachments/assets/d305dbcd-b694-43e8-a67c-4124dfb3c614" alt="signup_img" height=500px/><br> 


</details>

<details><summary>상품</summary>

###### 생성
<img src="https://github.com/user-attachments/assets/02cd337a-17cc-48a3-bfcb-995f3a2bfc67" alt="product_create_img" height=500px/><br> 

###### 수정
<img src="https://github.com/user-attachments/assets/1a3abc89-9b41-4612-9bf5-f46749d76059" alt="product_edit_img" height=500px/><br> 

###### 삭제
<img src="https://github.com/user-attachments/assets/aadbf6a0-6881-482e-a4ff-4d12d3cffd35" alt="product_delete_img" height=500px/><br> 

</details>

<details><summary>장바구니</summary>

###### 생성
<img src="https://github.com/user-attachments/assets/55a482ac-e989-468d-8720-a4f0571aace6" alt="cart_add_img" height=500px/><br> 

###### 수정
<img src="https://github.com/user-attachments/assets/f6be65ea-7367-43aa-a2b7-b80b78f3fd56" alt="cart_edit_img" height=500px/><br> 

###### 삭제
<img src="https://github.com/user-attachments/assets/64c6c61b-a48b-4025-b106-6ccfdefcca5e" alt="cart_delete_img" height=500px/><br> 

  
</details>

<details><summary>배송지
</summary>

###### 생성
<img src="https://github.com/user-attachments/assets/de38d054-a6ee-42a3-ba76-58475512d22f" alt="address_add_img" height=500px/><br> 

###### 수정
<img src="https://github.com/user-attachments/assets/c0703a70-ec1c-4f97-85e0-f7f52e1c04e5" alt="address_edit_img" height=500px/><br> 

###### 삭제
<img src="https://github.com/user-attachments/assets/eaf92a13-8c59-424f-b85c-ca87efa68de8" alt="address_delete_img" height=500px/><br> 


</details>

<details><summary>결제</summary>

###### 결제
<img src="https://github.com/user-attachments/assets/45917f86-99a8-44b2-9571-d0f0b6ad8bc3" alt="payment_img" height=500px/><br> 

###### 결제정보
<img src="https://github.com/user-attachments/assets/d1cfc76d-a2c8-43ca-82c5-ec91eb586cb9" alt="payment_info_img" height=500px/><br> 

###### 주문내역
<img src="https://github.com/user-attachments/assets/5a35c6b9-ac25-4835-9e09-e19670d70308" alt="payment_history_img" height=500px/><br> 

</details>

<br> 

## 트러블슈팅
<details><summary>상품 생성 시 로딩 지연
</summary>

 ##### 문제
 > 상품을 등록하는 요청의 로딩 시간이 오래 걸리는 문제가 발생하였습니다. 이로 인해 사용자 경험(UX)이 저하되고, 상품 등록이 지연되는 상황이 발생했습니다.
 ##### 원인
 > 여러 개의 이미지를 순서대로 등록하는 과정에서 시간이 많이 소요되는 문제를 발견했습니다.
 ##### 해결
 > 이미지 저장 API 요청을 병합 처리하여 로딩 시간을 거의 2배 단축시켰습니다. 이를 통해 여러 이미지를 동시에 처리할 수 있게 되어 전체적인 등록 속도가 개선되었습니다.

[자세히](https://github.com/kmuseong/commerce/wiki/%5B%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85%5D-%EC%83%81%ED%92%88-%EC%83%9D%EC%84%B1-%EC%8B%9C-%EB%A1%9C%EB%94%A9-%EC%A7%80%EC%97%B0) 
</details>

<details><summary>상품 수정 시 이미지수정 오류
</summary>

 ##### 문제
 > 이미지 추가가 아닌 변경하지 않거나 기존 이미지를 삭제하고 요청했을 경우 오류가 발생했습니다.
 ##### 원인
 > 이미지 수정 방법이 기존 이미지를 삭제한 후 새로운 이미지를 추가하도록 구현되어 있었으나, 수정 페이지가 렌더링될 때 이미지의 URL을 File 형태로 상태에 저장하는 과정에서 size와 type 값이 비어 있어서 오류가 발생했습니다.
 ##### 해결
 > 이미지의 URL을 이용하여 다시 File 객체로 변환하였습니다. 이미지 파일을 다시 다운로드하고 Blob으로 변환한 후, 그 Blob을 사용하여 새로운 File 객체를 생성하였습니다. 그 결과 성공적으로 요청이 되었습니다.

[자세히](https://github.com/kmuseong/commerce/wiki/%5B%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85%5D-%EC%83%81%ED%92%88-%EC%88%98%EC%A0%95-%EC%8B%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80%EC%88%98%EC%A0%95-%EC%98%A4%EB%A5%98
) 

</details>

<br> 

## 아키텍쳐
<img src="https://github.com/user-attachments/assets/7f61d2e1-2610-49e3-a6fd-e7dbd67450a7" alt="main_img" width=60%/><br> 

<br> 

## 폴더구조
```bash
  📦src
   ┣ 📂app
   ┃ ┣ 📂provider
   ┃ ┗ 📜App.tsx
   ┣ 📂assets
   ┣ 📂entities
   ┃ ┣ 📂auth
   ┃ ┃ ┗ 📜type.ts
   ┣ 📂features
   ┃ ┣ 📂login
   ┃ ┃ ┣ 📂api
   ┃ ┃ ┣ 📂model
   ┃ ┃ ┣ 📂ui
   ┃ ┃ ┗ 📜index.ts	
   ┣ 📂pages
   ┣ 📂shared
   ┃ ┣ 📂components
   ┃ ┃ ┃ ┣ 📜button.tsx
   ┃ ┗ 📂stores
   ┃ ┃ ┣ 📂auth
   ┃ ┃ ┃ ┣ 📜type.ts
   ┃ ┃ ┃ ┗ 📜useAuthStore.tsx
   ┣ 📂widgets
   ┣ 📜App.css
   ┣ 📜index.css
   ┣ 📜main.tsx
   ┣ 📜supabaseClient.ts
   ┗ 📜vite-env.d.ts
```
 <br> 

## 설치
```bash
  git clone https://github.com/kmuseong/commerce.git
```
```bash
  yarn install
  yarn dev
```


