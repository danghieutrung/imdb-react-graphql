import service from '../service/service'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import regression from '../lib/regression'
import SearchForm from './SearchForm';

const Chart = () => {
  const [data, setData] = useState(null)
  const [buttonText, setButtonText] = useState('Hide all trend lines')
  const [linesVisible, setLinesVisible] = useState(null)

  const handleHideButton = (event) => {
    event.preventDefault()
    setLinesVisible(!linesVisible)
    setButtonText(buttonText === 'Show all trend lines' ? 'Hide all trend lines' : 'Show all trend lines')
  }

  let { imdbID } = useParams()

  useEffect(() => {
    service
      .getSeriesRatings(imdbID)
      .then(response => {
        console.log(response)
        setLinesVisible(Array(response.totalSeasons).fill(true))
        setData(response)
      })
  }, [])

  if (data === null) {
    return (
      <div>
        Loading chart...
      </div>
    )
  }

  const results = service.modifyResults(data)

  const options = {
    title: {
      text: results.originalTitle
    },

    subtitle: {
      text: `Source: <a href='https://www.imdb.com/title/${imdbID}' target="_blank">IMDB</a>`
    },

    xAxis: {
      title: {
        text: `${results.totalSeasons} seasons - ${results.totalEpisodes} episodes`
      },
      min: 1,
      max: results.episodeTotal
    },

    yAxis: {
      title: {
        text: 'Ratings'
      },
      min: 0,
      max: 10
    },

    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: '<table>',
      pointFormat: '<tr><th>{point.options.custom.season}-{point.options.custom.episode} {point.options.custom.originalTitle}</th></tr>' +
        '<tr><td style="color: {series.color}">Rating: {point:y}</td>',
      footerFormat: '</table>',
      valueDecimals: 1
    },

    plotOptions: {
      series: {
        keys: ['x', 'y', 'custom.originalTitle', 'custom.imdbID', 'custom.season', 'custom.episode']
      }
    },

    series: results.ratings.flatMap((rating, index) => ([{
      type: 'scatter',
      name: `Season ${rating.season}`,
      custom: {
        imdbID: rating.imdbID
      },
      point: {
        events: {
          click: function () {
            window.location.replace(`https://www.imdb.com/title/${this.custom.imdbID.trim()}`)
          }
        }
      },
      data: rating.info,
      colorIndex: index % 10,
      marker: {
        radius: 4,
        symbol: 'circle'
      },
    },
    {
      type: 'line',
      data: regression.line(rating.info.map(x => x[0]), rating.info.map(x => x[1])),
      name: `Line ${rating.season}`,
      colorIndex: index % 10,
      showInLegend: false,
      marker: {
        enabled: false
      },
      states: {
        hover: {
          lineWidth: 0
        }
      },
      enableMouseTracking: false,
      visible: linesVisible
    }])),

    credits: {
      enabled: false
    }
  }

  return (
    <div>
      <SearchForm />
      <HighchartsReact highcharts={Highcharts} options={options} />
      <button type="button" onClick={handleHideButton}>{buttonText}</button>
    </div>
  )
}

export default Chart