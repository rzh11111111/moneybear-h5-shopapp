Skip to content
 Projects
Groups
Activity
Milestones
Snippets
Search or jump to…
38

M
zhangyao
moneyBear-H5-shopApp
Repository
v1.0.0.3
moneybear-h5-shopapp
 src
 components
 addimg
 contract.vue
 
 任宗豪's avatar
搜索改的好用一点
任宗豪 authored 3 months ago
ff38b1ac
 contract.vue 8.02 KB
 
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
<template>
    <div class="somemultiple">
        <div class="imgcontent"
             v-for="(value,index) in address"
        >
            <div  class="head-img" @click="look(index)">
            <img  :src="value" ref="goodsImg" />
            </div>
            <div class="add" @click="deletebus(index)" >×</div>
        </div>
        <van-uploader :after-read="addbus" multiple v-show="address!== undefined &&address.length<20">
            <div class="imginput" >
                +
            </div>
        </van-uploader>
    </div>
</template>
<script>
    import { ImagePreview } from 'vant';
    import {onewatermark} from "@utils";
    import lrz from 'lrz'
    export default {
        name: 'somemultiple',
        props: [
            'someMultiple',
            'filecode'
        ],
        data () {
            return {
                fileCategoryCode: 'FILE19011208395727',
                urls: {
                    Urls: []
                },
                Urls: ''
            }
        },
        methods: {
            async  addbus (file) {
                if (Array.isArray(file)) {
                    for (let files in file) {
                        if (this.urls.Urls.length > 19) {
                            console.log('多了')
                        } else {
                            lrz(file[files].content,{
                                quality:0.5
                            }).then(rst=>{
                                console.log(rst)
                                let blob = this.dataURItoBlob(rst.base64)
                                let fd = new FormData()
                                fd.append('filename', blob, file[files].file.name)
                                fd.append('fileCategoryCode', this.fileCategoryCode)
                                this.Api.upload(fd).then(res => {
                                    if(res.data.status==1){
                                        this.urls.Urls.push(res.data.data.url)
                                        this.Urls = this.urls.Urls.join(',')
                                        this.$emit('somemultiple', this.Urls)
                                    }else{
                                        this.$toast('图片上传失败')
                                    }
                                }).catch(error => {
                                    this.$toast('图片上传失败')
                                })
                               /* onewatermark(rst,(result)=> {
                                    let blob = this.dataURItoBlob(result)
                                    let fd = new FormData()
                                    fd.append('filename', blob, file[files].file.name)
                                    fd.append('fileCategoryCode', this.fileCategoryCode)
                                    this.Api.upload(fd).then(res => {
                                        // this.urls.showUrl = file.content
                                        if (res.data.status == 1) {
                                            this.urls.Urls.push(res.data.data.url)
                                            this.Urls = this.urls.Urls.join(',')
                                            this.$emit('somemultiple', this.Urls)
                                        } else {
                                            this.$toast('图片上传失败')
                                        }
                                    }).catch(error => {
                                        // alert(JSON.stringify(error))
                                        this.$toast('图片上传失败')
                                    })
                                })*/
                            })
                        }
                    }
                } else {
                    lrz(file.content,{
                        quality:0.5
                    }).then(rst=>{
                        console.log(rst)
                        let blob = this.dataURItoBlob(rst.base64)
                        let fd = new FormData()
                        fd.append('filename', blob, 'img.png')
                        fd.append('fileCategoryCode', this.fileCategoryCode)
                        this.Api.upload(fd).then(res => {
                            this.urls.Urls.push(res.data.data.url)
                            this.Urls = this.urls.Urls.join(',')
                            this.$emit('somemultiple', this.Urls)
                            console.log(this.Urls)
                        }).catch(error => {
                            console.log(error)
                        })
                     /*   onewatermark(rst,(result)=> {
                            let blob = this.dataURItoBlob(result)
                            let fd = new FormData()
                            fd.append('filename', blob, 'img.png')
                            fd.append('fileCategoryCode', this.fileCategoryCode)
                            this.Api.upload(fd).then(res => {
                                // this.urls.showUrl = file.content
                                if(res.data.status==1){
                                    this.urls.Urls.push(res.data.data.url)
                                    this.Urls = this.urls.Urls.join(',')
                                    this.$emit('somemultiple', this.Urls)
                                }else{
                                    this.$toast('图片上传失败')
                                }
                            }).catch(error => {
                                // alert(JSON.stringify(error))
                                this.$toast('图片上传失败')
                            })
                        })*/
                    })
                }
            },
            deletebus (index) {
                this.$delete(this.urls.Urls, index)
                this.Urls = this.urls.Urls.join(',') // 要成filedata的
                this.$emit('somemultiple', this.Urls)
            },
            look(index){
                console.log('111',this.someMultiple)
                   let multiple=this.someMultiple.split(',')
                this.$store.commit('SET_INSTANCE', ImagePreview({images:multiple,startPosition:index}))
            },
            dataURItoBlob (base64Data) {
                let byteString
                if (base64Data.split(',')[0].indexOf('base64') >= 0) { byteString = atob(base64Data.split(',')[1]) } else { byteString = unescape(base64Data.split(',')[1]) }
                let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
                let ia = new Uint8Array(byteString.length)
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i)
                }
                return new Blob([ia], {type: mimeString})
            }
        },
        computed: {
            address () {
                let urll
                if(this.someMultiple){
                    urll=this.someMultiple.split(',')
                }else{
                    urll=[]
                }
                // let urll=this.someMultiple.split(',')
                this.urls.Urls=urll
                this.Urls=this.someMultiple
                return urll
            }
        },
        watch:{
            'filecode'(){
                console.log(this.filecode)
                this.fileCategoryCode=this.filecode
            }
        },
        mounted(){
            this.fileCategoryCode=this.filecode
        }
    }
</script>
<style scoped>
    .somemultiple{
        display: flex;
        flex-wrap: wrap;
    }
    .imgcontent{
        width: 100px !important;
        height: 100px !important;
        margin-bottom: 10px;
    }
    .imgcontent /deep/ .add{
        margin-bottom: 10px;
    }
    .imginput{
        width: 100px!important;
        height: 100px !important;
        line-height: 100px !important;
    }
    .head-img{
        width: 100px !important;
        height: 100px !important;
    }
    .head-img /deep/ img{
        width: 100%;
        height: 100%;
    }
</style>