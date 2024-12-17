function updateForm() {
    const distributionType = document.getElementById('distribution').value;

    document.getElementById('normalParams').style.display = 'none';
    document.getElementById('binomialParams').style.display = 'none';
    document.getElementById('poissonParams').style.display = 'none';

    if (distributionType === 'normal') {
        document.getElementById('normalParams').style.display = 'block';
    } else if (distributionType === 'binomial') {
        document.getElementById('binomialParams').style.display = 'block';
    } else if (distributionType === 'poisson') {
        document.getElementById('poissonParams').style.display = 'block';
    }
}

function generateDistribution() {
    const distributionType = document.getElementById('distribution').value;

    let xData = [];
    let yData = [];

    if (distributionType === 'normal') {
        const mean = parseFloat(document.getElementById('mean').value);
        const variance = parseFloat(document.getElementById('variance').value);
        const stdDev = Math.sqrt(variance);

        for (let i = -10; i <= 10; i += 0.1) {
            xData.push(i);
            const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((i - mean) / stdDev, 2));
            yData.push(y);
        }

    } else if (distributionType === 'binomial') {
        const n = parseInt(document.getElementById('n').value);
        const p = parseFloat(document.getElementById('p').value);

        for (let k = 0; k <= n; k++) {
            xData.push(k);
            const y = binomial(n, k, p);
            yData.push(y);
        }

    } else if (distributionType === 'poisson') {
        const lambda = parseFloat(document.getElementById('lambda').value);

        for (let k = 0; k <= 20; k++) {
            xData.push(k);
            const y = poisson(k, lambda);
            yData.push(y);
        }
    }

    const trace = {
        x: xData,
        y: yData,
        type: 'scatter',
        mode: 'lines',
        name: `${distributionType.charAt(0).toUpperCase() + distributionType.slice(1)} Distribution`
    };

    const layout = {
        title: `${distributionType.charAt(0).toUpperCase() + distributionType.slice(1)} Distribution`,
        xaxis: { title: 'X' },
        yaxis: { title: 'Probability' },
        autosize: true,
    };

    Plotly.newPlot('chart', [trace], layout);
}

function binomial(n, k, p) {
    const combination = factorial(n) / (factorial(k) * factorial(n - k));
    return combination * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function poisson(k, lambda) {
    return Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k);
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

updateForm();
