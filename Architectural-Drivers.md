# '오늘 뭐 먹지'의 시청 품질 프로파일링 서비스 요구사항 명세서

## 1. 문서 설명(Document Description)
### 1.1. 목적(Purpose)
본 문서의 목적은 **Enact** 프로젝트의 아키텍처 설계에 대한 주요 요구사항을 정의하고, 해당 시스템이 충족해야 할 기술적, 비기능적 요구사항을 기술하는 것이다.


### 1.2. 범위(Scope)
본 문서의 범위는 제약사항(Constraints), 기능 요구사항(Functional Requirements), 품질 요구사항(Quality Attribute)이며, 이를 설명하기 위해 필요한 시스템 컨텍스트(System context)와 용어에 대한 정의를 포함한다.

### 1.3. 용어 및 정의(Terminologies and Definitions)

Adaptive (Bitrate) Streaming : 소스 콘텐츠가 여러 비트레이트로 인코딩되는, HTTP 경유 비디오 스트리밍 방식의 하나이다.

## 2. 시스템 컨텍스트(System Context)

**GStreamer**를 활용한 **Adaptive Streaming** 기술과 **동영상 인코딩/디코딩** 기능을 지원하여 다양한 네트워크 환경에 최적화된 스트리밍을 제공한다. **클라이언트 애플리케이션**과 **서버 백엔드**로 구성 요소로 나눌 수 있다. 클라이언트 애플리케이션은 Enact 기반으로 구현되며, 사용자 인터페이스와 스트리밍 서비스를 제공한다. 서버 백엔드는 비디오 데이터를 처리하고 관리하며, **GStreamer**를 통해 인코딩 및 스트리밍을 담당한다. 비디오 스트리밍은 **HLS** 기술을 사용하여 여러 품질 수준에서 **Adaptive Streaming**을 제공한다.
 

## 3. 요구사항(Requirements)

## 3.1. 기능 요구사항(functional Requirements)

## Backend Server

### 3.1.1. 비디오 인코딩 및 저장

1. **비디오 인코딩**:

   - 서버는 업로드된 비디오 파일을 **GStreamer**를 사용하여 **low**, **medium**, **high** 품질의 비디오로 인코딩한한다.
   - 각 품질 수준의 비디오는 세그먼트 파일(.ts 파일)로 분할된다.
   - 품질별로 각각의 **m3u8** 플레이리스트 파일이 생성된다다.
   
2. **파일 저장**:

   - 인코딩된 **m3u8** 파일과 세그먼트 파일은 **AWS S3** 버킷에 저장된다.
   - 각 비디오에 대한 **m3u8** 파일과 관련된 세그먼트 파일은 동일한 디렉터리 내에 저장된다.
   - **master.m3u8** 파일이 생성되어 **low**, **medium**, **high** 품질을 포함하는 모든 품질 레벨에 대한 참조를 포함하여 스트리밍에 사용될 수 있도록 공개적으로 접근할 수 있게 설정된다.


| ID    | Requirements  | API ID    | Test Case ID  |
|--------|--------|--------|--------|
| FR01-1  | videoId: 인코딩할 동영상 ID    | BA05-02  |


### 3.1.2 비디오 플레이리스트 관리

1. **비디오 메타 정보 저장**
    - 서버는 각 영상 파일의 위치, 제목, 설명, 업로드 날짜 등과 같은 비디오 메타 정보를 관리한다.
   - 비디오의 **m3u8** 파일과 관련된 세그먼트 파일들의 경로를 저장하여, 해당 비디오가 어디에 저장되어 있는지 추적할 수 있다.

| ID | Requirements | API ID | Test Case ID |
|--------|--------|--------|--------|
| FR01-2  | videoId: 디코딩할 동영상 ID   | BA05-04 |



## Frontend Server


### 3.2.1. 비디오 스트리밍

1. **스트리밍**

    - **AWS S3**에 저장된 **master.m3u8** 파일을 **HLS.js**를 사용하여 스트리밍한다.
    - 사용자는 **low**, **medium**, **high**, **auto** 품질 옵션을 선택할 수 있다.
    
| ID    | Requirements  | Test Case ID  |
|--------|--------|--------|
| FR01-1  |  **AWS S3**에 저장된 **master.m3u8** 파일을 **HLS.js**를 사용하여 스트리밍할 수 있다.  |  |

2. **Adaptive Streaming**

    - 사용자의 네트워크 상태에 맞춰 실시간으로 품질을 조정할 수 있는 적응형 스트리밍 기능을 제공한다.
   - 프론트엔드에서 **HLS.js** 모듈은 네트워크 속도와 스트리밍 상태를 모니터링하여 자동으로 품질을 조정한다.
   - 사용자가 **auto** 모드를 선택하면, **HLS.js**는 자동으로 **bps**에 따라 최적의 품질을 선택하고, 해당 품질에 맞는 세그먼트를 로드하여 스트리밍을 지속한다.

| ID    | Requirements  | Test Case ID  |
|--------|--------|--------|
| FR02-2  | AUTO 모드를 선택하면 네트워크 대역폭에 따라 해상도가 자동으로 조정된다.  |  |


3. **사용자 품질 선택**:
   - 사용자는 명시적으로 **low**, **medium**, **high** 품질을 선택할 수 있다. 이때, 선택된 품질에 맞는 **m3u8** 파일이 로드된다.
   - 품질 변경 시, 스트리밍은 새로운 품질의 세그먼트 파일을 로드하여 즉시 변경된 품질로 재생된다.
  

| ID    | Requirements  | Test Case ID  |
|--------|--------|--------|
| FR02-3-1  | LOW 옵션 선택시 해상도가 640x360에 해당하는 영상 재생된다.  |  |
| FR02-3-2  | MEDIUM 옵션 선택시 해상도가 1280x720에 해당하는 영상 재생된다. |   |
| FR02-3-3  | HIGH 옵션 선택시 해상도가 1920x1080에 해당하는 영상 재생된다. |   |


### 3.3 품질 요구사항 (Quality Attribute)

| ID | Requirement |
|--------|--------|
| QA01 | 각 비디오 스트림의 로딩 시간은 5초 이내로 유지되어야 한다. |
| QA02 | Adaptive Streaming 모드에서, 네트워크 대역폭에 맞는 최적의 품질을 실시간으로 자동으로 조정할 수 있어야 한다. |
| QA03 | 비디오 인코딩 및 스트리밍 프로세스는 자동화되어, 새로운 비디오 파일을 쉽게 추가하고, 필요한 경우 업데이트할 수 있어야 한다. |
| QA04 | 사용자 인터페이스는 직관적이어야 하며, 비디오 탐색, 품질 설정, 스트리밍 기능을 쉽게 사용할 수 있어야 한다. |
| QA05 | AWS S3는 비디오 파일의 저장 및 스트리밍을 위해 안정적인 클라우드 스토리지 솔루션을 제공해야 한다. |
| QA06 | AWS S3에 저장된 파일은 빠르게 액세스 가능해야 하며, 데이터 전송 속도와 안정성을 보장해야 한다. |
| QA07 |  비디오 인코딩 파이프라인은 원활하게 작동해야 하며, 각 품질 수준의 비디오를 실시간으로 인코딩할 수 있어야 한다. |
| QA08 | 파이프라인은 다양한 비디오 크기(파일 크기, 해상도 등)를 처리할 수 있어야 하며, 대용량 비디오 파일도 빠르고 효율적으로 처리해야 한다. |

### 3.4. 제약 사항(Constraint Requirement)

| ID | Requirement |
|--------|--------|
| CR01 | 데이터베이스는 AWS S3룰룰 사용한다. |
| CR02 | 서버 프레임워크는 Spring Boot로 사용한다. |
