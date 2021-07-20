import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { EChartsOption ,LineSeriesOption} from 'echarts'
import ReactECharts from "echarts-for-react";
import { Button, message } from "antd";
import request from '../../request'
import moment from 'moment'
import "./index.css";

interface CourseItem {
  title: string;
}

type datas = {[key: string]: CourseItem[]}
const Home: React.FC = () => {
  const [islogin, setislogin] = useState(true);
  const [loads, setloads] = useState(false);
  const [datas, setdatas] = useState<datas>({});

  useEffect(() => {
    // 在此可以执行任何带副作用操作
    request.get("/api/islogin")
      .then((res) => {
        console.log(res);
        const data: responseResult.isLogin = res.data
        if (!data) {
          setislogin(false);
          setloads(true);
        }
        setloads(true);
      });
      request.get('/api/showdata')
      .then(res=>{
        const data: datas =  res.data
        setdatas(data)
      })
      
    return () => {
      // 在此做一些收尾工作, 比如清除定时器/取消订阅等
    };
  }, []);
  const handlePaquClick = () => {
    request.get("/api/getdata")
      .then((res) => {
        const data: responseResult.getdata = res.data
        if (data) {
          message.success("爬取成功");
        }
      });
  };
  const handleLogoutClick = (e: React.MouseEvent) => {
    // console.log(e.target)
    request.get("/api/logout")
      .then((res) => {
        // console.log(res);
        const data: responseResult.logout = res.data
        if (data) {
          setislogin(false);
        } else {
          message.error("退出失败");
        }
      });
  };
  const getOption: ()=> EChartsOption = () => {
        const courseNames: string[] =[];
        const times: string[] = [];
        const tempData: {
          [key: string]: number[]
        } = {};
        for(let i in datas) {
          // console.log(datas[i])
          const item = datas[i]
          times.push(moment(Number(i)).format('MM-DD HH:mm'))
          item.forEach((innerItem)=> {
            if(courseNames.indexOf(innerItem.title) === -1) {
              courseNames.push(innerItem.title)
            }
            tempData[innerItem.title] ?  tempData[innerItem.title].push(Math.round(Math.random()*100)) : (tempData[innerItem.title] = [Math.round(Math.random()*100)])
          })
        }
        const result: LineSeriesOption[] = []
        for (let i in tempData) {
          result.push({
            name: i,
            type: 'line',
            data: tempData[i]
          })
        }
        console.log(courseNames)
    return {
      title: {
          text: '课程在线学习'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: courseNames
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: times
      },
      yAxis: {
          type: 'value'
      },
      series: result
  }
  }
  if (islogin) {
    if (loads) {
      return (
        <div className="home-page">
          <div className="buttons">
          <Button type="primary" onClick={handlePaquClick}
          style={{marginRight: '25px'}}
          >
            爬取
          </Button>
          <Button type="primary" onClick={handleLogoutClick}>
            退出
          </Button>
          </div>
          <ReactECharts
            option={getOption()}
        
          />
        </div>
      );
    }
    return null;
  }
  return <Redirect to="/login" />;
};

export default Home;
