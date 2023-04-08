# 目录

[[toc]]

## MyBatis 动态sql

MyBatis 动态sql可以在Xml映射文件内，以标签的形式编写动态sql，执行原理是根据表达式的值完成逻辑判断并动态调整sql的功能

Mybatis提供了9种动态sql标签： `trim | where | set | foreach | if | choose | when | otherwise | bind`

~~~xml
<!-- 
	if
	相当于 java 中的 if 判断
 	test的值为一个判断表达式，当test成立的时候，if体内部的sql会被拼接上
-->
<if test="判断条件"> 
需要追加的sql
</if>

<!-- 
	choose/when/otherwise
	相当于 java 中的 if..else if..else
 	choose内部的条件满足一个，choose内部的sql拼接就会结束
	otherwise属于可选的，当所有条件都不满足的时候，otherwise将起效
-->
<choose>
	<when test="条件1">
		满足条件1追加的sql
	</when>
	<when test="条件2">
		满足条件2追加的sql
	</when>
	<otherwise>
		都不满足追加的sql
	</otherwise>
</choose>

<!-- 
	where
	当使用where元素的时候，mybatis会将where内部拼接的sql进行处理，
	会将这部分sql前面的 AND 或者 OR 给去掉，并在前面追加一个where
-->
<select id="getList1" resultType="com.javacode2018.chat05.demo8.model.UserModel"
parameterType="map">
SELECT id,name,age FROM t_user
	<where>
		<if test="id!=null">
			AND id = #{id}
		</if>
		<if test="name!=null and name.toString()!=''">
			AND name = #{name}
		</if>
		<if test="age!=null">
			AND age = #{age}
		</if>
	</where>
</select>

<!-- 
	set
	我们将sql中的set去掉了，加了个set元素，set元素会对其内部拼接的sql进行处理，
	会将这部分sql前后的逗号给去掉并在前面加上 set
-->
<update id="update1"
	parameterType="com.javacode2018.chat05.demo8.model.UserModel">
	UPDATE t_user
	<set>
		<if test="name!=null">
			name = #{name},
		</if>
		<if test="age!=null">
			age = #{age},
		</if>
	</set>
	<where>
		<if test="id!=null">
    		AND id = #{id}
		</if>
	</where>
</update>

<!-- 
	trim
	语法：
		<trim prefix="" prefixOverrides="" suffix="" suffixOverrides="">
		</trim>
	trim元素内部可以包含各种动态sql，如where、chose、sql等各种元素，使用trim包含的元素，
	mybatis处理过程：
		1. 先对trim内部的sql进行拼接，比如这部分sql叫做sql1
		2. 将sql1字符串前面的部分中包含trim的prefixOverrides指定的部分给去掉，得到sql2
		3. 将sql2字符串后面的部分中包含trim的suffixOverrides指定的部分给去掉，得到sql3
		4. 在sql3前面追加trim中prefix指定的值，得到sql4
		5. 在sql4后面追加trim中suffix指定的值，得到最终需要拼接的sql5
	prefixOverrides的值的写法，如果有多个需要覆盖的之间用 | 进行分割，suffixOverrides
	写法和prefixOverrides的写法类似
-->
<select id="getList1" resultType="com.javacode2018.chat05.demo8.model.UserModel"
	parameterType="map">
	SELECT id,name,age FROM t_user
	<trim prefix="where" prefixOverrides="and|or">
		<if test="id!=null">
			AND id = #{id}
		</if>
		<if test="name!=null and name.toString()!=''">
			AND name = #{name}
		</if>
		<if test="age!=null">
			AND age = #{age}
		</if>
	</trim>
</select>

<update id="update1"
	parameterType="com.javacode2018.chat05.demo8.model.UserModel">
	UPDATE t_user
	<trim prefix="SET" prefixOverrides="," suffixOverrides=",">
		<if test="name!=null">
			name = #{name},
		</if>
		<if test="age!=null">
			age = #{age},
		</if>
	</trim>
	<where>
		<if test="id!=null">
			AND id = #{id}
		</if>
	</where>
</update>

<!-- 
	foreach
	相当于java中的循环，可以用来遍历数组、集合、map等
	语法：
		<foreach collection="需要遍历的集合" item="集合中当前元素" index="" open=""
			separator="每次遍历的分隔符" close="">
			动态sql部分
		</foreach>
	collection：可以是一个List、Set、Map或者数组
	item：集合中的当前元素的引用
	index：用来访问当前元素在集合中的位置
	separator：各个元素之间的分隔符
	open和close用来配置最后用什么前缀和后缀将foreach内部所有拼接的sql给包装起来
-->
<select id="getList1" resultType="com.javacode2018.chat05.demo8.model.UserModel"
	parameterType="map">
	SELECT id,name,age FROM t_user
	<where>
		<if test="id!=null">
			AND id = #{id}
		</if>
		<if test="name!=null and name.toString()!=''">
			AND name = #{name}
		</if>
		<if test="age!=null">
			AND age = #{age}
		</if>
		<if test="idList!=null and idList.size()>=1">
			<foreach collection="idList" item="id" open="AND id in ("
				separator="," close=")">
				#{id}
			</foreach>
		</if>
	</where>
</select>

<insert id="insertBatch" parameterType="list">
	INSERT INTO t_user (id,name,age) VALUES
	<foreach collection="collection" separator="," item="item">
		(#{item.id}, #{item.name}, #{item.age})
	</foreach>
</insert>

<!-- 
	sql/include
	这两2个元素一般进行配合使用，可以实现代码重用的效果
	sql元素可以用来定义一段动态sql，语法如下：
		<sql id="sql片段id">
			各种动态sql
		</sql>
	其他地方需要使用的时候需要通过include关键字进行引入
		<include refid="需要引入的sql片段的id"/>
	注意：refid值的写法，refid的值为mapper xml的 namespace的值.sql的id ，
		如果在同一个mapper中，namespace可以省略，直接写对应的sql的id就可以了
-->
<sql id="findSql">
	<where>
		<if test="id!=null">
			AND id = #{id}
		</if>
		<if test="name!=null and name.toString()!=''">
			AND name = #{name}
		</if>
		<if test="age!=null">
			AND age = #{age}
		</if>
		<if test="idList!=null and idList.size()>=1">
			<foreach collection="idList" item="id" open="AND id in ("
			separator="," close=")">
				#{id}
			</foreach>
		</if>
	</where>
</sql>

<select id="getList1" resultType="com.javacode2018.chat05.demo8.model.UserModel"
parameterType="map">
	SELECT id,name,age FROM t_user
	<include refid="com.javacode2018.chat05.demo8.mapper.UserMapper.findSql" />
</select>

<select id="getList1Count"
resultType="com.javacode2018.chat05.demo8.model.UserModel" parameterType="map">
	SELECT count(*) FROM t_user
	<include refid="findSql" />
</select>

<!-- 
	bind
	bind元素允许我们通过ognl表达式在上下文中自定义一个变量，最后在动态sql中可以使用这个变量
	语法：<bind name="变量名称" value="ognl表达式">
-->
<if test="likeName!=null and likeName.trim()!=''">
	<bind name="nameLike" value="'%'+likeName.trim()+'%'" />
	AND name like #{nameLike}
</if>
~~~



## Xml映射文件中标签

除了常见的`select`|`insert`|`updae`|`delete`标签之外，

还有：`<resultMap>、<parameterMap>、<sql>、<include>、<selectKey>` ，加上动态`sql`的9个标签，其中  为`sql`片段标签，通过`<include>`  标签引入sql片

段，`<selectKey>`  为不支持自增的主键生成策略标签。











































































































































