import{_ as n,c as a,d as e,o as l}from"./app-uBpxEUoB.js";const i={};function p(d,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h2 id="equals方法" tabindex="-1"><a class="header-anchor" href="#equals方法"><span>equals方法</span></a></h2><p><code>Object#equals</code></p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">public boolean equals(Object obj) {</span>
<span class="line">    return (this == obj);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>equals是顶层方法，可以看出默认和<code>==</code>一致，也就是比较内存地址是否相等。</p><h2 id="equals作用" tabindex="-1"><a class="header-anchor" href="#equals作用"><span>equals作用</span></a></h2><h3 id="没有重写equals的情况" tabindex="-1"><a class="header-anchor" href="#没有重写equals的情况"><span>没有重写equals的情况</span></a></h3><p>没有重写equals，效果其实等同于==</p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">public class Sample1 {</span>
<span class="line">    public static void main(String[] args) {</span>
<span class="line">        Person p1 = new Person(20, &quot;lisi&quot;);</span>
<span class="line">        Person p2 = new Person(20, &quot;lisi&quot;);</span>
<span class="line">        System.out.println(p1.equals(p2));</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    private static class Person {</span>
<span class="line">        int age;</span>
<span class="line">        String name;</span>
<span class="line">        </span>
<span class="line">        public Person(int age, String name) {</span>
<span class="line">            this.age = age;</span>
<span class="line">            this.name = name;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为false 没有重写equals，则比较的是对象的内存地址</p><h3 id="重写了equals的情况" tabindex="-1"><a class="header-anchor" href="#重写了equals的情况"><span>重写了equals的情况</span></a></h3><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">public class Sample2 {</span>
<span class="line">    public static void main(String[] args) {</span>
<span class="line">        Person p1 = new Person(20, &quot;lisi&quot;);</span>
<span class="line">        Person p2 = new Person(20, &quot;lisi&quot;);</span>
<span class="line">        System.out.println(p1.equals(p2));</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    private static class Person {</span>
<span class="line">        int age;</span>
<span class="line">        String name;</span>
<span class="line">        </span>
<span class="line">        public Person(int age, String name) {</span>
<span class="line">            this.age = age;</span>
<span class="line">            this.name = name;</span>
<span class="line">        }</span>
<span class="line">        </span>
<span class="line">        @Override</span>
<span class="line">        public boolean equals(Object o) {</span>
<span class="line">            if(o == null) {</span>
<span class="line">                return false;</span>
<span class="line">            }</span>
<span class="line">            if(this == o) {</span>
<span class="line">                return true;</span>
<span class="line">            }</span>
<span class="line">            if(this.getClass() != o.getClass()) {</span>
<span class="line">                return false;</span>
<span class="line">            }</span>
<span class="line">            Person p = (Person)o;</span>
<span class="line">            return name.equals(p.name) &amp;&amp; age == p.age;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出true 重写equals有几个必须要遵守的点：</p><ol><li>对称性，x.equals(y)为true，则y.equals(x)也必须为true</li><li>反射性，x.equals(x)必须为true</li><li>类推性，x.equals(y)为true，y.equals(z)为true，那么z.equals(x)也必须为true</li><li>一致性，x.equals(y)为true，只要x和y内容不变，无论重复多少次x.equals(y)，那么都必须为true；x.equals(不同类型)必须返回false</li><li>非空性，x.equals(null)都必须返回false</li></ol><h2 id="equals与-的区别" tabindex="-1"><a class="header-anchor" href="#equals与-的区别"><span>equals与<code>==</code>的区别</span></a></h2><ol><li><code>==</code>：它的作用是判断两个对象的内存地址是否对象</li><li>equals：它的作用是判断两个对象是否相等，有两种情况 <ol><li>没有重写equals方法，等价于<code>==</code></li><li>重写了equals方法，比较两个对象的内容是否相等，若内容相等，则equals返回true</li></ol></li></ol><h2 id="hashcode方法" tabindex="-1"><a class="header-anchor" href="#hashcode方法"><span>hashCode方法</span></a></h2><p>分两种情况</p><h3 id="不会创建-类对应的散列表" tabindex="-1"><a class="header-anchor" href="#不会创建-类对应的散列表"><span>不会创建“类对应的散列表”</span></a></h3><p>不会在HashSet、HashMap、Hashtable等这些哈希表数据结构容器中用到该类，则该类符合【不会创建“类对应的散列表”】类型</p><ol><li>此时hashCode方法和equals方法是无关的</li><li>这种情况，equals用于表示两个对象是否相等，与hashCode无关</li></ol><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">public class Sample3 {</span>
<span class="line"></span>
<span class="line">    public static void main(String[] args) {</span>
<span class="line">        Person p1 = new Person(20, &quot;lisi&quot;);</span>
<span class="line">        Person p2 = new Person(20, &quot;lisi&quot;);</span>
<span class="line">        Person p3 = new Person(30, &quot;lisi&quot;);</span>
<span class="line">        System.out.printf(&quot;p1.equals(p2) : %s; p1(%d) p2(%d)\\n&quot;, p1.equals(p2), p1.hashCode(), p2.hashCode());</span>
<span class="line">        System.out.printf(&quot;p1.equals(p3) : %s; p1(%d) p3(%d)\\n&quot;, p1.equals(p3), p1.hashCode(), p3.hashCode());</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    private static class Person {</span>
<span class="line">        int age;</span>
<span class="line">        String name;</span>
<span class="line">        </span>
<span class="line">        public Person(int age, String name) {</span>
<span class="line">            this.age = age;</span>
<span class="line">            this.name = name;</span>
<span class="line">        }</span>
<span class="line">        </span>
<span class="line">        @Override</span>
<span class="line">        public boolean equals(Object o) {</span>
<span class="line">            if(o == null) {</span>
<span class="line">                return false;</span>
<span class="line">            }</span>
<span class="line">            if(this == o) {</span>
<span class="line">                return true;</span>
<span class="line">            }</span>
<span class="line">            if(this.getClass() != o.getClass()) {</span>
<span class="line">                return false;</span>
<span class="line">            }</span>
<span class="line">            Person p = (Person)o;</span>
<span class="line">            return name.equals(p.name) &amp;&amp; age == p.age;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种情况就是没在哈希结构的容器中使用到，所以跟hashCode没啥关系</p><h3 id="会创建-类对应的散列表" tabindex="-1"><a class="header-anchor" href="#会创建-类对应的散列表"><span>会创建“类对应的散列表”</span></a></h3><p>此种情况可以理解为会在哈希结构的容器中使用到，所以必然与hashCode有关，比如用到了HashSet 在这种情况下，hashCode与equals是有一定关系的</p><ol><li>如果两个对象相等（equals为true），那么它们hashCode一定相等</li><li>如果两个对象hashCode相等，它们不一定相等，此种情况也叫哈希冲突</li></ol><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">public class Sample4 {</span>
<span class="line"></span>
<span class="line">    public static void main(String[] args) {</span>
<span class="line">        Person p1 = new Person(20, &quot;lisi&quot;);</span>
<span class="line">        Person p2 = new Person(20, &quot;lisi&quot;);</span>
<span class="line">        Person p3 = new Person(30, &quot;lisi&quot;);</span>
<span class="line">        System.out.printf(&quot;p1.equals(p2) : %s; p1(%d) p2(%d)\\n&quot;, p1.equals(p2), p1.hashCode(), p2.hashCode());</span>
<span class="line">        System.out.printf(&quot;p1.equals(p3) : %s; p1(%d) p3(%d)\\n&quot;, p1.equals(p3), p1.hashCode(), p3.hashCode());</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    private static class Person {</span>
<span class="line">        int age;</span>
<span class="line">        String name;</span>
<span class="line">        </span>
<span class="line">        public Person(int age, String name) {</span>
<span class="line">            this.age = age;</span>
<span class="line">            this.name = name;</span>
<span class="line">        }</span>
<span class="line">        </span>
<span class="line">        @Override</span>
<span class="line">        public int hashCode() {</span>
<span class="line">            int i = name.hashCode();</span>
<span class="line">            return i % age;</span>
<span class="line">        }</span>
<span class="line">        </span>
<span class="line">        @Override</span>
<span class="line">        public boolean equals(Object o) {</span>
<span class="line">            if(o == null) {</span>
<span class="line">                return false;</span>
<span class="line">            }</span>
<span class="line">            if(this == o) {</span>
<span class="line">                return true;</span>
<span class="line">            }</span>
<span class="line">            if(this.getClass() != o.getClass()) {</span>
<span class="line">                return false;</span>
<span class="line">            }</span>
<span class="line">            Person p = (Person)o;</span>
<span class="line">            return name.equals(p.name) &amp;&amp; age == p.age;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说之所以重写equals要重写hashCode，就是因为必须保证以哈希表为数据结构的容器（比如HashSet）添加元素时的正确性。</p>`,27)]))}const r=n(i,[["render",p]]),u=JSON.parse('{"path":"/posts/obsidian/%E8%AF%AD%E8%A8%80/Java/hashcode%E4%B8%8Eequals.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"equals方法","slug":"equals方法","link":"#equals方法","children":[]},{"level":2,"title":"equals作用","slug":"equals作用","link":"#equals作用","children":[{"level":3,"title":"没有重写equals的情况","slug":"没有重写equals的情况","link":"#没有重写equals的情况","children":[]},{"level":3,"title":"重写了equals的情况","slug":"重写了equals的情况","link":"#重写了equals的情况","children":[]}]},{"level":2,"title":"equals与==的区别","slug":"equals与-的区别","link":"#equals与-的区别","children":[]},{"level":2,"title":"hashCode方法","slug":"hashcode方法","link":"#hashcode方法","children":[{"level":3,"title":"不会创建“类对应的散列表”","slug":"不会创建-类对应的散列表","link":"#不会创建-类对应的散列表","children":[]},{"level":3,"title":"会创建“类对应的散列表”","slug":"会创建-类对应的散列表","link":"#会创建-类对应的散列表","children":[]}]}],"git":{"updatedTime":1748842810000,"contributors":[{"name":"sujie","username":"sujie","email":"13156660820@163.com","commits":1,"url":"https://github.com/sujie"}],"changelog":[{"hash":"906fd9063805f50a4e5ae54af0e65b6022d19921","time":1748842810000,"email":"13156660820@163.com","author":"sujie","message":"publish:cpOb2Posts, 2025-06-02 13:40:10"}]},"filePathRelative":"posts/obsidian/语言/Java/hashcode与equals.md","excerpt":"<h2>equals方法</h2>\\n<p><code>Object#equals</code></p>\\n<div class=\\"language-Java line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"Java\\"><pre><code><span class=\\"line\\">public boolean equals(Object obj) {</span>\\n<span class=\\"line\\">    return (this == obj);</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{r as comp,u as data};
