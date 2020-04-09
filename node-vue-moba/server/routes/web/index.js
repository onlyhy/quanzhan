/*
 * @Date: 2020-04-09 10:17:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-09 16:11:36
 */
module.exports = app => {
  const router = require('express').Router()
  // 获取模型
  // const Category = require('../../models/Category')
  // const Article = require('../../models/Article')
  // 之前下面获取模型的方法不加Schema会报错是因为在index.js中db.js一定要在接口路由前引用
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')

  //   只是测试录数据的，正式不用
  router.get('/news/init', async (req, res) => {
    // 只找新闻分类下的子分类
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    // lean是取纯粹的Json JS对象或数组，不带mongoose里面的模型对象
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["新皮肤爆料丨拔刀斩恶魂！橘右京新装登场~", "豪横！王者荣耀英雄主打歌完整歌单霸气登陆酷狗！", "蔡文姬繁星吟游皮肤，史诗升级进行时！", "冷艳御姐是如何练成的？参与「镜」主题创作赢荣耀水晶", "廉颇重塑计划爆料", "4月5日开服及奖励通知", "4月9日体验服不停机更新公告", "4月8日净化游戏环境声明及处罚公告", "4月8日“演员”惩罚名单", "4月8日体验服停机更新公告", "橘右京全新史诗皮肤上架 SNK皮肤齐聚峡谷福利大放送", "【预告】荣耀中国节·轻风戏纸鸢，参与必得纸鸢回城特效（永久）", "参与“S19战令集结号”，赢80级直升经验大礼", "【镜界诞生 见证觉醒】活动公告", "S19赛季来临 多重好礼邀你开启全新赛季", "为战队争夺荣誉！城市联赛战队赛通道报名开启！", "高校联赛分站赛即将打响 今年又有多少好玩的活动值得期待？", "《一招即浪》第一期：白起强势归来，教你如何化身“边路杀神”", "KPL王者荣耀职业联赛4月4日比赛停赛公告", "《王者荣耀》城市赛选手看过来！新版本“玄雍危机”热门英雄玩法盘点"]
    const newsList = newsTitles.map(title => {
      // slice方法：如果 end 未被规定，那么 slice() 方法会选取从 start 到数组结尾的所有元素
      // 复制一份出来sort排序，Math.random结果是0到1之间 减去0.5可为正可为负
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    })
    // 清空
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)

  })

  router.get('/news/list', async (req, res) => {
    // 先找出点击的分类
    // 关联children再关联children的newsList
    // const parent = await Category.findOne({
    //   name:'新闻分类'
    // }).populate({path:'children',populate:{path:'newsList'}}).lean()

    // 这边要用聚合查询（在一次查询里可以同时执行好几次查询然后得到想要的结果）
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    // match类似于where条件查询
    // lookup类似于join，外连接
    // articles是因为新建模型的时候省略的第三个参数集合名是按照模型名来的，小写复数形式
    // localField本地键     foreignField外地键
    // as 起个名字
    // $slice是一个操作符表示取它里面的几个
    // $newsList就是我们查出来的数据即as里写的newsList
    // 总的来说：先查找出parent是新闻分类的分类，然后根据分类_id去articles中找到categories中有这个分类_id的文章设置为newsList属性，最后将newsList属性限制为只要5条记录
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields:{
          newsList: {$slice:['$newsList',5]}
        }
      }
    ])
    // 在查询结果前面加一个对象
    // 热门这里关联一下categories，以便后面取一个分类名
    const subCats = cats.map(v=>
      v._id
    )
    cats.unshift({
      name:'热门',
      newsList: await Article.find().where({
        categories:{$in: subCats}
      }).populate('categories').limit(5).lean()
    })
    // 处理前端要在资讯前的[]显示的分类名
    cats.map(cat=>{
      cat.newsList.map(news=>{
        news.categoryName = cat.name === '热门'? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  app.use('/web/api', router)
}
