# Backend REST API Reference

## 1. 비디오 정보 관리

### 1.1 비디오 수정

#### **Request**

| ID     | URL              | HOST        | METHOD  |
|--------|------------------|-------------|---------|
| BA01-1 | /api/video/update | {BACKEND_URL}  | PUT     |

**Request Body**
| Name          | Type    | Description                                              | Required |
|---------------|---------|----------------------------------------------------------|----------|
| id            | Integer | 비디오 고유 ID                                           | TRUE      |
| uploaderId    | Integer | 비디오 업로더의 고유 ID                                  | TRUE      |
| title         | String  | 비디오 제목                                              | TRUE      |
| description   | String  | 비디오 설명                                              | TRUE      |
| sourceUrl     | String  | 비디오 소스 URL                                          | TRUE      |
| thumbUrl      | String  | 썸네일 이미지 URL                                        | TRUE      |
| hashtags      | Array   | 비디오와 관련된 해시태그 목록                            | TRUE      |
| category      | String  | 비디오의 카테고리                                        | TRUE      |
| foodName      | String  | 음식 이름                                                | TRUE      |
| ingredients   | Array   | 비디오에서 다루는 재료 목록                              |FALSE      |

#### **Response**
| NAME    | TYPE   | DESCRIPTION                                  |
|---------|--------|----------------------------------------------|
| message | String | 성공 메시지 또는 오류 메시지               |
| video   | Object | 수정된 비디오의 상세 정보 (id, title 등)    |
| status  | String | 처리 상태 (성공/실패)                        |


### 1.2 비디오 업로드

#### **Request**

| ID     | URL              | HOST        | METHOD  |
|--------|------------------|-------------|---------|
| BA01-2 | /api/video/upload | {BACKEND_URL}  | POST    |

**Request Body**
| Name          | Type     | Description                                              | Required |
|---------------|----------|----------------------------------------------------------|----------|
| id            | Integer  | 비디오 고유 ID                                           | TRUE      |
| uploaderId    | Integer  | 비디오 업로더의 고유 ID                                  | TRUE      |
| title         | String   | 비디오 제목                                              | TRUE      |
| description   | String   | 비디오 설명                                              | TRUE      |
| videoFile     | String   | 업로드할 비디오 파일 (formdata 형식)                     | TRUE      |
| thumbnailFile | String   | 썸네일 이미지 파일 (formdata 형식)                       | TRUE      |
| hashtags      | Array    | 비디오와 관련된 해시태그 목록                            | FALSE      |
| category      | String   | 비디오의 카테고리                                        | TRUE      |
| foodName      | String   | 음식 이름                                                | TRUE      |
| ingredients   | Array    | 비디오에서 다루는 재료 목록                              | TRUE      |

#### **Response**
| NAME    | TYPE   | DESCRIPTION                                  |
|---------|--------|----------------------------------------------|
| message | String | 성공 메시지 또는 오류 메시지               |
| video   | Object | 업로드된 비디오의 상세 정보 (id, title 등)    |
| status  | String | 처리 상태 (성공/실패)                        |



### 1.3 비디오 가져오기


#### **Request**

| ID     | URL               | HOST        | METHOD  |
|--------|-------------------|-------------|---------|
| BA01-3 | /api/video/{category} | {BACKEND_URL} | GET     |


**Parameter**
| Name          | Type     | Description                                              | Required |
|---------------|----------|----------------------------------------------------------|----------|
| category            | String  | 카테고리 이름                                       | TRUE      |

#### **Response**
| NAME    | TYPE   | DESCRIPTION                                  |
|---------|--------|----------------------------------------------|
| videos  | Array  | 주어진 카테고리에 해당하는 비디오 목록       |
| status  | String | 처리 상태 (성공/실패)                        |



### 1.4 비디오 검색하기

#### **Request**

| ID     | URL              | HOST        | METHOD  |
|--------|------------------|-------------|---------|
| BA01-4 | /api/video/search | {BACKEND_URL}  | GET     |


**Parameter**
| Name          | Type     | Description                                              | Required |
|---------------|----------|----------------------------------------------------------|----------|
| query            | String  | 검색 내용용      | FALSE      |


#### **Response**
| NAME    | TYPE   | DESCRIPTION                                  |
|---------|--------|----------------------------------------------|
| videos  | Array  | 검색 결과에 해당하는 비디오 목록            |
| status  | String | 처리 상태 (성공/실패)                        |

---

### 1.5 비디오 정보 조회

#### **Request**

| ID     | URL                     | HOST        | METHOD  |
|--------|-------------------------|-------------|---------|
| BA01-5 | /api/video/play/{videoId} | {BACKEND_URL}  | GET     |

**Parameter**
| Name          | Type     | Description                                              | Required |
|---------------|----------|----------------------------------------------------------|----------|
| videoId            | Integer  | 비디오 고유 ID                    | TRUE      |

#### **Response**
| NAME     | TYPE   | DESCRIPTION                                  |
|----------|--------|----------------------------------------------|
| video    | Object | 비디오 상세 정보 (title, description 등)      |
| status   | String | 처리 상태 (성공/실패)                        |



### 1.6 비디오 삭제

#### **Request**

| ID     | URL                     | HOST        | METHOD  |
|--------|-------------------------|-------------|---------|
| BA01-6 | /api/video/delete/{videoId} | {BACKEND_URL}  | DELETE  |

**Parameter**
| Name          | Type     | Description                                              | Required |
|---------------|----------|----------------------------------------------------------|----------|
| videoId            | Integer  | 비디오 고유 ID                    | TRUE      |

#### **Response**
| NAME    | TYPE   | DESCRIPTION                                  |
|---------|--------|----------------------------------------------|
| message | String | 성공 메시지 또는 오류 메시지               |
| status  | String | 처리 상태 (성공/실패)                        |

---

### 1.7 유저가 업로드한 영상 조회

#### **Request**

| ID     | URL                     | HOST        | METHOD  |
|--------|-------------------------|-------------|---------|
| BA01-7 | /api/video/user/{userId}  | {BACKEND_URL}  | GET     |

**Parameter**
| Name          | Type     | Description                                              | Required |
|---------------|----------|----------------------------------------------------------|----------|
| userId            | Integer  | 유저저 고유 ID                    | TRUE      |

#### **Response**
| NAME    | TYPE   | DESCRIPTION                                  |
|---------|--------|----------------------------------------------|
| videos  | Array  | 주어진 유저가 업로드한 비디오 목록           |
| status  | String | 처리 상태 (성공/실패)                        |

# Backend REST API Reference - Playlist

## 2. 플레이리스트 관리

### 2.1 플레이리스트 업데이트

#### **Request**

| ID     | URL               | BACKEND        | METHOD  |
|--------|-------------------|-------------|---------|
| BA02-1 | /api/playlist/update | {BACKEND_URL} | PUT     |

**Request Body**
| Name          | Type    | Description                                     | Required |
|---------------|---------|-------------------------------------------------|----------|
| id            | Integer | 플레이리스트 고유 ID                            | True      |
| videoId       | Integer | 추가하거나 삭제할 비디오의 고유 ID             | True      |
| title         | String  | 플레이리스트 제목                               | True      |
| insertFlag    | Boolean | 비디오를 추가할지 여부 (true: 추가, false: 삭제) | True      |
| deleteFlag    | Boolean | 비디오를 삭제할지 여부 (true: 삭제, false: 유지) | True      |

#### **Response**
| Name       | Type   | Description                                   |
|------------|--------|-----------------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지                 |
| status     | String | 처리 상태 (성공/실패)                         |
| playlist   | Object | 업데이트된 플레이리스트 정보 (id, title 등)  |



### 2.2 플레이리스트 생성
#### **Request**

| ID     | URL               | BACKEND        | METHOD  |
|--------|-------------------|-------------|---------|
| BA02-2 | /api/playlist/create | {BACKEND_URL} | POST    |

**Request Body**:
| Name          | Type    | Description                                     | Required |
|---------------|---------|-------------------------------------------------|----------|
| title         | String  | 플레이리스트 제목                               | True      |
| description   | String  | 플레이리스트 설명                               | No       |
| videoIds      | Array   | 포함된 비디오들의 ID 목록                       | True      |
| userId        | Integer | 플레이리스트를 소유한 유저의 고유 ID            | True      |

#### **Response**
| Name       | Type   | Description                                   |
|------------|--------|-----------------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지                 |
| status     | String | 처리 상태 (성공/실패)                         |
| playlist   | Object | 새로 생성된 플레이리스트 정보 (id, title 등) |


### 2.3 플레이리스트 가져오기

#### **Request**

| ID     | URL                      | BACKEND        | METHOD  |
|--------|--------------------------|-------------|---------|
| BA02-3 | /api/playlist/{playlistId} | {BACKEND_URL}  | GET     |

**Request Parameters**:
| Name        | Type    | Description                                   | Required |
|-------------|---------|-----------------------------------------------|----------|
| playlistId  | Integer | 조회할 플레이리스트의 고유 ID                | True      |

#### **Response**
| Name       | Type   | Description                                      |
|------------|--------|--------------------------------------------------|
| playlist   | Object | 요청된 플레이리스트의 상세 정보 (id, title 등)  |
| status     | String | 처리 상태 (성공/실패)                            |



### 2.4 플레이리스트 조회

#### **Request**

| ID     | URL                   | BACKEND        | METHOD  |
|--------|-----------------------|-------------|---------|
| BA02-4 | /api/playlist/getPlaylist | {BACKEND_URL} | GET     |

**Request Parameters**
| Name   | Type    | Description                        | Required |
|--------|---------|------------------------------------|----------|
| userId | Integer | 플레이리스트를 조회할 유저의 ID   | True      |

#### **Response**
| Name        | Type    | Description                                      |
|-------------|---------|--------------------------------------------------|
| playlists   | Array   | 유저가 소유한 플레이리스트 목록                  |
| status      | String  | 처리 상태 (성공/실패)                            |



### 2.5 플레이리스트 삭제

#### **Request**

| ID     | URL                        | BACKEND        | METHOD  |
|--------|----------------------------|-------------|---------|
| BA02-5 | /api/playlist/delete/{playlistId} | {BACKEND_URL}  | DELETE  |

**Request Parameters**
| Name        | Type    | Description                        | Required |
|-------------|---------|------------------------------------|----------|
| playlistId  | Integer | 삭제할 플레이리스트의 고유 ID     | True      |

#### **Response**
| Name       | Type   | Description                                   |
|------------|--------|-----------------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지                 |
| status     | String | 처리 상태 (성공/실패)                         |

## 3. 유저 관리

### 3.1 유저 정보 업데이트


#### **Request**

| ID     | URL              | HOST        | METHOD  |
|--------|------------------|-------------|---------|
| BA03-1 | /api/user/update | {BACKEND_URL}  | PUT     |

**Request Body**
| Name       | Type    | Description                    | Required |
|------------|---------|--------------------------------|----------|
| loginId    | String  | 유저의 로그인 ID               | True      |
| password   | String  | 유저의 비밀번호                | True      |
| name       | String  | 유저의 이름                    | True      |

#### **Response**
| Name       | Type   | Description                          |
|------------|--------|--------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지        |
| status     | String | 처리 상태 (성공/실패)                |



### 3.2 유저 등록

#### **Request**

| ID     | URL              | HOST        | METHOD  |
|--------|------------------|-------------|---------|
| BA03-2 | /api/user/register | {BACKEND_URL}  | POST    |

**Request Body**
| Name       | Type    | Description                    | Required |
|------------|---------|--------------------------------|----------|
| loginId    | String  | 유저의 로그인 ID               | True      |
| password   | String  | 유저의 비밀번호                | True      |
| name       | String  | 유저의 이름                    | True      |

#### **Response**
| Name       | Type   | Description                          |
|------------|--------|--------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지        |
| status     | String | 처리 상태 (성공/실패)                |



### 3.3 로그아웃

#### **Request**

| ID     | URL              | HOST        | METHOD  |
|--------|------------------|-------------|---------|
| BA03-3 | /api/user/logout | {BACKEND_URL}  | POST    |


#### **Response**
| Name       | Type   | Description                          |
|------------|--------|--------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지        |
| status     | String | 처리 상태 (성공/실패)                |


### 3.4 특정 유저 정보 조회

#### **Request**

| ID     | URL               | HOST        | METHOD  |
|--------|-------------------|-------------|---------|
| BA03-4 | /api/user/{userId} | {BACKEND_URL}  | GET     |

**Request Parameters**
| Name       | Type    | Description                    | Required |
|------------|---------|--------------------------------|----------|
| userId     | Integer | 조회할 유저의 고유 ID           | True      |

#### **Response**
| Name            | Type     | Description                                               |
|-----------------|----------|-----------------------------------------------------------|
| id              | Integer  | 유저 고유 ID                                              |
| loginId        | String   | 유저의 로그인 ID                                          |
| name           | String   | 유저의 이름                                               |
| videoHistories | Array    | 유저의 비디오 시청 기록 (배열로 반환)                     |
| foodPreferences| Object   | 유저의 음식 취향 정보                                     |
| lastLogin      | String   | 마지막 로그인 시간                                        |
| createdAt      | String   | 유저 계정 생성 시간                                       |

## 4. 영상 시청 기록 관리

### 4.1 영상 시청 기록 생성

#### **Request**

| ID     | URL                  | HOST        | METHOD  |
|--------|----------------------|-------------|---------|
| BA04-1 | /api/videoHistory/create | {BACKEND_URL} | POST    |

**Request Body**:
| Name            | Type    | Description                                    | Required |
|-----------------|---------|------------------------------------------------|----------|
| videoId         | Integer | 시청한 비디오의 고유 ID                        | True      |
| videoTimeStamp  | Integer | 비디오의 시청 위치 (초 단위로 저장)             | True      |

#### **Response**
| Name       | Type   | Description                                   |
|------------|--------|-----------------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지                 |
| status     | String | 처리 상태 (성공/실패)                         |


### 4.2 특정 비디오의 시청 기록 조회

#### **Request**

| ID     | URL                            | HOST        | METHOD  |
|--------|--------------------------------|-------------|---------|
| BA04-2 | /api/videoHistory/getHistoryByVideo/{videoId} | {BACKEND_URL} | GET     |

**Path Parameter**:
| Name     | Type    | Description                      | Required |
|----------|---------|----------------------------------|----------|
| videoId  | Integer | 조회할 비디오의 고유 ID          | True      |

#### **Response**
| Name       | Type     | Description                                     |
|------------|----------|-------------------------------------------------|
| videoId    | Integer  | 조회된 비디오의 고유 ID                         |
| videoTimeStamp | Integer | 비디오의 시청 위치 (초 단위)                    |
| lastWatchedAt | String   | 마지막 시청 일시                            |
| userId     | Integer  | 유저의 고유 ID                                 |


### 4.3 특정 시청 기록 조회

#### **Request**

| ID     | URL                        | HOST        | METHOD  |
|--------|----------------------------|-------------|---------|
| BA04-3 | /api/videoHistory/getHistory/{videoHistoryId} | {BACKEND_URL} | GET     |

**Path Parameter**:
| Name              | Type    | Description                            | Required |
|-------------------|---------|----------------------------------------|----------|
| videoHistoryId    | Integer | 시청 기록의 고유 ID                   | True      |

#### **Response**
| Name            | Type     | Description                                   |
|-----------------|----------|-----------------------------------------------|
| videoId         | Integer  | 비디오의 고유 ID                              |
| videoTimeStamp  | Integer  | 비디오의 시청 위치 (초 단위)                  |
| lastWatchedAt   | String   | 마지막 시청 일시 (ISO 8601 형식)              |
| userId          | Integer  | 유저의 고유 ID                                |


### 4.4 로그인한 유저의 전체 시청 기록 조회

#### **Request**

| ID     | URL                        | HOST        | METHOD  |
|--------|----------------------------|-------------|---------|
| BA04-4 | /api/videoHistory/getHistories | {BACKEND_URL} | GET     |

#### **Response**
| Name            | Type     | Description                                   |
|-----------------|----------|-----------------------------------------------|
| videoHistories  | Array    | 로그인한 유저의 모든 시청 기록               |
| lastWatchedAt   | String   | 각 비디오의 마지막 시청 일시                 |



### 4.5 시청 기록 삭제

#### **Request**

| ID     | URL                        | HOST        | METHOD  |
|--------|----------------------------|-------------|---------|
| BA04-5 | /api/videoHistory/delete/{videoHistoryId} | {BACKEND_URL} | DELETE  |

**Path Parameter**
| Name              | Type    | Description                            | Required |
|-------------------|---------|----------------------------------------|----------|
| videoHistoryId    | Integer | 삭제할 시청 기록의 고유 ID             | True      |

#### **Response**
| Name       | Type   | Description                                   |
|------------|--------|-----------------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지                 |
| status     | String | 처리 상태 (성공/실패)                         |

## 6. 장바구니 관리

### 6.1 장바구니에 재료 추가

비디오에 포함된 재료를 장바구니에 추가

#### **Request**

| ID     | URL                | HOST        | METHOD  |
|--------|--------------------|-------------|---------|
| BA06-1 | /api/cart/add/{videoId} | {BACKEND_URL} | POST    |

**Path Parameter**
| Name      | Type    | Description                      | Required |
|-----------|---------|----------------------------------|----------|
| videoId   | Integer | 비디오의 ID    | Yes      |

#### **Response**
| Name       | Type   | Description                                   |
|------------|--------|-----------------------------------------------|
| message    | String | 성공 메시지 또는 오류 메시지                 |
| status     | String | 처리 상태 (성공/실패)                         |


### 6.2 장바구니 조회

#### **Request**

| ID     | URL        | HOST        | METHOD  |
|--------|------------|-------------|---------|
| BA06-2 | /api/cart  | {BACKEND_URL}  | GET     |

#### **Response**
| Name       | Type    | Description                                    |
|------------|---------|------------------------------------------------|
| items     | Object  | 장바구니에 담긴 항목 (재료와와 개수)             |


### 6.3 장바구니 비우기

#### **Request**

| ID     | URL               | HOST        | METHOD  |
|--------|-------------------|-------------|---------|
| BA06-3 | /api/cart/clear    | {BACKEND_URL}  | DELETE  |

#### **Response**
| Name       | Type   | Description                                  |
|------------|--------|----------------------------------------------|
| message    | String | 장바구니 비우기 성공 메시지 또는 오류 메시지 |
| status     | String | 처리 상태 (성공/실패)                        |




