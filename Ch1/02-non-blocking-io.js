// 논블로킹 I/O와 폴링 루프를 사용하여 여러 리소스를 읽어 들이는 코드
resources = [socketA, socketB, fileA]
while (!resources.isEmpty()) {
  for (resource of resources) {
    // 읽기를 시도
    data = resource.read()
    if (data === NO_DATA_AVAILABLE) {
      // 이 순간에는 읽을 데이터가 없음
      continue
    }
    if (data === RESOURCE_CLOSED) {
      // 리소스가 닫히고 리스트에서 삭제
      resources.remove(resource)
    } else {
      // 데이터를 받고 처리
      consumeData(data)
    }
  }
}
