class EasyLRUCache {
    // 标记缓存顺序
    list=[]
    // 存储数据
    cache={}

    capacity=null

    constructor(capacity){
        // 初始化缓存容量上限
        this.capacity=capacity
    }
    // 获取key
    get(key){
        // 如果缓存中存在key
        if(this.cache[key]!==undefined){
            this.refresh(key)
            return this.cache[key]
        }
    }


    // 设置key
    put(key,value){
        // 如果之前缓存中存在key,则设置后，缓存容量不发生变化
        // 只需要刷新list中key所在位置并设置key对应的value
        if(this.cache[key]){
            this.refresh(key)
            this.cache[key]=value
            return
        }

        //如果长度超过容量上限，需要淘汰内存中的数据
        if(this.list.length>=this.capacity){
            //取出cache中最老的key(对应到list中就是第一个),淘汰之
            const latest=this.list.shift()
            delete this.cache[latest]
        }

        // 写入数据
        this.cache[key]=value
        //更新list，将当前设置的key放在list末尾
        this.list.push(key)
    }


    // 设置和获取key的时候，需要刷新key，使其保持为最新的激活状态
    refresh(key){
        //查找key在list中的位置
        const index=this.list.indexOf(key)
        if(index!==-1){
            // 从list中删除key
            this.list.splice(index,1)
        }
        // 重新在list中录入key
        this.list.push(key)
    }
}