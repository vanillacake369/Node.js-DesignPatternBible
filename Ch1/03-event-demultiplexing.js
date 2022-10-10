// 이벤트 디멀티플렉서 (이벤트 루프가 타고있어요.)
// 각 리소스가 데이터구조(List)에 추가됩니다. 각 리소스를 특정 연산과 연결합니다.
watchedList.add(socketA, FOR_READ)
watchedList.add(fileB, FOR_READ)

// 디멀티플렉서가 관찰될 리소스 그룹과 함께 설정됩니다. 
// demutiplexer.watch()는 동기식으로 관찰되는 리소스들 중에서 읽을 준비가 된 리소스가 있을 때까지 블로킹됩니다.
// 준비된 리소스가 생기면, 이벤트 디멀티플렉서는 처리를 위한 새로운 이벤트 세트를 반환합니다.
while (events = demultiplexer.watch(watchList)) {
    // **이벤트 루프(event loop)**
    // 이벤트 디멀티플렉서에서 반환된 각 이벤트가 처리됩니다. 이 시점에서 각 이벤트와 관련된 리소스는 읽을 준비 및 차단되지 않는 것이 보장됩니다.
    // 모든 이벤트가 처리되고 나면, 이 흐름은 다시 이벤트 디멀티플렉서가 처리 가능한 이벤트를 반환하기 전까지 블로킹됩니다.
    // 이를 **이벤트 루프(event loop)**라고 합니다.
    for (event of events) {
        // 블로킹하지 않으며 항상 데이터를 반환된 각 이벤트가 처리됩니다.
        data = event.resource.read()
        if (data === RESOURCE_CLOSED) {
            // 리소스가 닫히고 관찰되는 리스트에서 삭제
            demultiplexer.unwatch(event.resource)
        } else {
            // 실제 데이터를 받으면 처리
            cosumeData(data)
        }
    }
}