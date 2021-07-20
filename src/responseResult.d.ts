interface CourseItem {
  title: string;
}

interface datas {[key: string]: CourseItem[]}

declare namespace responseResult {
 type isLogin  = boolean;
 type login = boolean;
 type logout = boolean;
 type getdata = boolean;
 type showdata = datas | boolean;

}