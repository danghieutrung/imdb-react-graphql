import service from '../service/service'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = () => {
  const [data, setData] = useState('')
  let { imdbID } = useParams()
  useEffect(() => {
    service
    .GetSeriesRatings(imdbID)
    .then(response => {
      setData(response)})
    },[])
  
  if (data==='') {
    return(
      <div>
        Loading chart
      </div>
      )
  }
  else {
  const results = service.ModifyResults(data)
  const regression = service.regression(results)
  const imdbID = results.imdbID
  const options = {
    title: {
        text: results.originalTitle
    },
    subtitle: {
        text: `Source: <a href='https://www.imdb.com/title/${imdbID}' target="_blank">IMDB</a>`
    },

    xAxis: {
      min: 1,
      max: results.episodeTotal
    },

    yAxis: {
      title: {
          text: 'Number of Employees'
      },
      min: 0,
      max: 10
    },
    tooltip: {
          // enabled: false,
          shared: true,
          useHTML: true,
          headerFormat: '<table>',
          pointFormat: '<tr><th>{point.options.custom.season}-{point.options.custom.episode} {point.options.custom.originalTitle}</th></tr>' +
            '<tr><td style="color: {series.color}">Ratings: {point:y}</td>',
          footerFormat: '</table>',
          valueDecimals: 1
    },
    plotOptions: {
      series: {
        keys:['x','y','custom.originalTitle','custom.imdbID','custom.season','custom.episode']
      }
    },
    series: results.ratings.flatMap((rating, index) => 
      ([{
        type: 'scatter',
        name: `Season ${rating.season}`,
        custom: {
          blah: 'Mangooooo',
          imdbID: rating.imdbID
        },
        point: {
          events: {
              click: function() {
                window.location.replace(`https://www.imdb.com/title/${this.custom.imdbID.trim()}`)
            }
          }
        },
        data: rating.info,
        colorIndex: index,
        marker: {
        radius: 4,
        symbol: 'circle'
        }
      }
      ,{
        type: 'line',
        data: regression[index].regression,
        name: `Line ${rating.season}`,
        colorIndex: index,
        showInLegend: false,
        marker: {
            enabled: false
        },
        states: {   
            hover: {
            lineWidth: 0
            }
        },
        enableMouseTracking: false
      }]
    ))
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
  }
}

export default Chart