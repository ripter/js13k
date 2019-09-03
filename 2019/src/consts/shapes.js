export const EXCLUDE_FROM_RANDOM = [
  'TIMER',
];
export const SHAPES = {
  PENCIL: [
    'moveTo',[0.333,0.946],
    'lineTo',[0.054,1],
    'lineTo',[0,0.946],
    'lineTo',[0.054,0.667],
    'lineTo',[0.721,0],
    'lineTo',[1,0.277],
    'lineTo',[0.333,0.946],
  ],
  BRUSH: [
    'moveTo',[0.901,0],
    'lineTo',[1,0.098],
    'bezierCurveTo',[0.678,0.664,0.427,0.905,0.248,0.823],
    'lineTo',[0.202,0.774],
    'bezierCurveTo',[0.139,0.567,0.372,0.309,0.901,0],
    'moveTo',[0.097,0.764],
    'lineTo',[0.1,0.761],
    'bezierCurveTo',[0.119,0.741,0.141,0.731,0.168,0.731],
    'bezierCurveTo',[0.195,0.73,0.219,0.74,0.239,0.76],
    'bezierCurveTo',[0.258,0.78,0.267,0.805,0.267,0.834],
    'bezierCurveTo',[0.267,0.863,0.258,0.887,0.239,0.907],
    'lineTo',[0.236,0.91],
    'bezierCurveTo',[0.195,0.953,0.154,0.983,0.11,1],
    'lineTo',[0.016,0.997],
    'bezierCurveTo',[-0.004,0.977,-0.005,0.944,0.012,0.897],
    'bezierCurveTo',[0.028,0.851,0.056,0.807,0.097,0.764],
  ],
  // SOMETHING: [
  //   'moveTo',[0.857,0.45],
  //   'bezierCurveTo',[0.857,0.464,0.85,0.476,0.836,0.486],
  //   'bezierCurveTo',[0.821,0.495,0.805,0.5,0.786,0.5],
  //   'lineTo',[0.7,0.5],
  //   'lineTo',[0.691,0.506],
  //   'bezierCurveTo',[0.751,0.524,0.805,0.549,0.854,0.581],
  //   'bezierCurveTo',[0.951,0.647,1,0.727,1,0.821],
  //   'bezierCurveTo',[1,0.871,0.951,0.913,0.854,0.948],
  //   'bezierCurveTo',[0.757,0.983,0.639,1,0.5,1],
  //   'bezierCurveTo',[0.362,1,0.244,0.983,0.146,0.948],
  //   'bezierCurveTo',[0.05,0.913,0.001,0.871,0,0.821],
  //   'bezierCurveTo',[0,0.727,0.049,0.647,0.146,0.581],
  //   'bezierCurveTo',[0.195,0.549,0.249,0.524,0.309,0.506],
  //   'lineTo',[0.3,0.5],
  //   'lineTo',[0.214,0.5],
  //   'bezierCurveTo',[0.194,0.5,0.177,0.495,0.162,0.486],
  //   'bezierCurveTo',[0.149,0.476,0.143,0.464,0.143,0.45],
  //   'lineTo',[0.143,0.051],
  //   'bezierCurveTo',[0.143,0.037,0.149,0.025,0.162,0.015],
  //   'bezierCurveTo',[0.177,0.005,0.194,0,0.214,0],
  //   'lineTo',[0.786,0],
  //   'bezierCurveTo',[0.805,0,0.821,0.005,0.836,0.015],
  //   'bezierCurveTo',[0.85,0.025,0.857,0.037,0.857,0.05],
  //   'lineTo',[0.857,0.45],
  // ],
  // JOYSTICK: [
  //   'moveTo',[0.5,0],
  //   'bezierCurveTo',[0.634,0,0.749,0.03,0.843,0.089],
  //   'bezierCurveTo',[0.95,0.155,1.002,0.236,1,0.334],
  //   'bezierCurveTo',[1.003,0.43,0.951,0.511,0.843,0.577],
  //   'lineTo',[0.845,0.577],
  //   'bezierCurveTo',[0.799,0.606,0.749,0.628,0.695,0.643],
  //   'lineTo',[0.695,0.889],
  //   'bezierCurveTo',[0.695,0.92,0.684,0.947,0.663,0.969],
  //   'lineTo',[0.66,0.971],
  //   'bezierCurveTo',[0.638,0.99,0.612,1,0.584,1],
  //   'lineTo',[0.417,1],
  //   'bezierCurveTo',[0.386,1,0.36,0.99,0.339,0.971],
  //   'lineTo',[0.336,0.967],
  //   'bezierCurveTo',[0.316,0.945,0.306,0.919,0.306,0.889],
  //   'lineTo',[0.306,0.643],
  //   'bezierCurveTo',[0.251,0.628,0.201,0.606,0.156,0.577],
  //   'bezierCurveTo',[0.05,0.511,-0.002,0.43,0,0.334],
  //   'bezierCurveTo',[-0.002,0.236,0.05,0.155,0.156,0.089],
  //   'bezierCurveTo',[0.251,0.03,0.366,0,0.5,0],
  // ],
  DPAD: [
    'moveTo',[1,0.333],
    'lineTo',[1,0.667],
    'bezierCurveTo',[1,0.681,0.994,0.694,0.983,0.706],
    'bezierCurveTo',[0.972,0.717,0.959,0.722,0.944,0.722],
    'lineTo',[0.722,0.722],
    'lineTo',[0.722,0.944],
    'bezierCurveTo',[0.722,0.96,0.717,0.974,0.706,0.985],
    'bezierCurveTo',[0.694,0.995,0.681,1,0.667,1],
    'lineTo',[0.333,1],
    'bezierCurveTo',[0.318,1,0.304,0.995,0.293,0.985],
    'bezierCurveTo',[0.283,0.974,0.278,0.96,0.278,0.944],
    'lineTo',[0.278,0.722],
    'lineTo',[0.056,0.722],
    'bezierCurveTo',[0.04,0.722,0.026,0.717,0.015,0.706],
    'bezierCurveTo',[0.005,0.694,0,0.681,0,0.667],
    'lineTo',[0,0.333],
    'bezierCurveTo',[0,0.318,0.005,0.304,0.015,0.293],
    'bezierCurveTo',[0.026,0.283,0.04,0.278,0.056,0.278],
    'lineTo',[0.278,0.278],
    'lineTo',[0.278,0.057],
    'bezierCurveTo',[0.278,0.041,0.283,0.028,0.293,0.017],
    'bezierCurveTo',[0.304,0.006,0.318,0,0.333,0],
    'lineTo',[0.667,0],
    'bezierCurveTo',[0.681,0,0.694,0.006,0.706,0.017],
    'bezierCurveTo',[0.717,0.028,0.722,0.041,0.722,0.056],
    'lineTo',[0.722,0.278],
    'lineTo',[0.943,0.278],
    'bezierCurveTo',[0.959,0.278,0.972,0.283,0.983,0.293],
    'bezierCurveTo',[0.994,0.304,1,0.318,1,0.333],
  ],
  // TURNARROW: [
  //   'moveTo',[0.29,0.238],
  //   'bezierCurveTo',[0.29,0.405,0.351,0.547,0.474,0.665],
  //   'bezierCurveTo',[0.532,0.72,0.596,0.763,0.667,0.794],
  //   'bezierCurveTo',[0.719,0.815,0.775,0.829,0.834,0.835],
  //   'lineTo',[0.834,0.714],
  //   'lineTo',[1,0.714],
  //   'lineTo',[1,1],
  //   'lineTo',[0.917,0.998],
  //   'bezierCurveTo',[0.829,0.998,0.745,0.986,0.667,0.962],
  //   'bezierCurveTo',[0.551,0.927,0.447,0.865,0.356,0.778],
  //   'bezierCurveTo',[0.202,0.63,0.124,0.45,0.124,0.238],
  //   'lineTo',[0,0.238],
  //   'lineTo',[0.207,0],
  //   'lineTo',[0.414,0.238],
  //   'lineTo',[0.29,0.238],
  // ],
  // UARROW: [
  //   'moveTo',[0.769,0.202],
  //   'lineTo',[0.779,0.208],
  //   'bezierCurveTo',[0.926,0.297,1,0.407,1,0.536],
  //   'bezierCurveTo',[1,0.665,0.926,0.774,0.779,0.865],
  //   'bezierCurveTo',[0.631,0.954,0.451,0.999,0.239,0.999],
  //   'lineTo',[0.159,1],
  //   'lineTo',[0.159,0.822],
  //   'lineTo',[0.318,0.822],
  //   'lineTo',[0.318,0.9],
  //   'bezierCurveTo',[0.452,0.89,0.568,0.855,0.666,0.796],
  //   'bezierCurveTo',[0.783,0.724,0.841,0.637,0.841,0.536],
  //   'bezierCurveTo',[0.841,0.434,0.783,0.348,0.666,0.277],
  //   'lineTo',[0.656,0.271],
  //   'lineTo',[0.658,0.271],
  //   'bezierCurveTo',[0.541,0.203,0.402,0.169,0.239,0.169],
  //   'lineTo',[0.239,0.242],
  //   'lineTo',[0,0.121],
  //   'lineTo',[0.239,0],
  //   'lineTo',[0.239,0.073],
  //   'bezierCurveTo',[0.444,0.073,0.62,0.115,0.767,0.201],
  //   'lineTo',[0.767,0.202],
  //   'lineTo',[0.769,0.202],
  // ],
  // PRINTER: [
  //   'moveTo',[0.688,0.021],
  //   'bezierCurveTo',[0.7,0.036,0.706,0.052,0.706,0.071],
  //   'lineTo',[0.706,0.464],
  //   'lineTo',[0.941,0.464],
  //   'bezierCurveTo',[0.957,0.464,0.971,0.471,0.982,0.486],
  //   'bezierCurveTo',[0.994,0.5,1,0.517,1,0.536],
  //   'lineTo',[1,0.929],
  //   'bezierCurveTo',[1,0.949,0.994,0.966,0.982,0.98],
  //   'bezierCurveTo',[0.971,0.993,0.957,1,0.941,1],
  //   'lineTo',[0.059,1],
  //   'bezierCurveTo',[0.042,1,0.028,0.993,0.016,0.98],
  //   'bezierCurveTo',[0.005,0.966,0,0.949,0,0.929],
  //   'lineTo',[0,0.537],
  //   'bezierCurveTo',[0,0.517,0.005,0.5,0.016,0.486],
  //   'bezierCurveTo',[0.028,0.471,0.042,0.464,0.059,0.464],
  //   'lineTo',[0.265,0.464],
  //   'lineTo',[0.265,0.073],
  //   'bezierCurveTo',[0.265,0.053,0.27,0.036,0.281,0.021],
  //   'bezierCurveTo',[0.293,0.007,0.307,0,0.324,0],
  //   'lineTo',[0.647,0],
  //   'bezierCurveTo',[0.663,0,0.676,0.007,0.688,0.021],
  // ],
  // AWARD: [
  //   'moveTo',[1,0.352],
  //   'bezierCurveTo',[1,0.449,0.951,0.532,0.854,0.601],
  //   'bezierCurveTo',[0.81,0.633,0.761,0.658,0.708,0.676],
  //   'lineTo',[0.708,0.973],
  //   'lineTo',[0.698,0.993],
  //   'lineTo',[0.671,1],
  //   'lineTo',[0.644,0.994],
  //   'lineTo',[0.5,0.892],
  //   'lineTo',[0.356,0.994],
  //   'lineTo',[0.329,1],
  //   'lineTo',[0.302,0.993],
  //   'lineTo',[0.292,0.973],
  //   'lineTo',[0.292,0.677],
  //   'bezierCurveTo',[0.237,0.659,0.187,0.633,0.142,0.601],
  //   'bezierCurveTo',[0.047,0.532,0,0.449,0,0.352],
  //   'bezierCurveTo',[0,0.254,0.047,0.17,0.142,0.102],
  //   'bezierCurveTo',[0.239,0.034,0.358,0,0.5,0],
  //   'bezierCurveTo',[0.639,0,0.757,0.034,0.854,0.102],
  //   'bezierCurveTo',[0.951,0.17,1,0.254,1,0.352],
  // ],
  // AWARD2: [
  //   'moveTo',[0.902,0.359],
  //   'bezierCurveTo',[0.902,0.439,0.876,0.51,0.825,0.572],
  //   'lineTo',[0.827,0.574],
  //   'lineTo',[0.995,0.838],
  //   'lineTo',[1,0.857],
  //   'lineTo',[0.983,0.874],
  //   'lineTo',[0.962,0.878],
  //   'lineTo',[0.805,0.841],
  //   'lineTo',[0.764,0.982],
  //   'lineTo',[0.747,0.997],
  //   'lineTo',[0.725,1],
  //   'lineTo',[0.707,0.988],
  //   'lineTo',[0.539,0.724],
  //   'lineTo',[0.537,0.719],
  //   'lineTo',[0.502,0.721],
  //   'lineTo',[0.465,0.719],
  //   'lineTo',[0.462,0.724],
  //   'lineTo',[0.294,0.988],
  //   'lineTo',[0.275,1],
  //   'lineTo',[0.254,0.997],
  //   'lineTo',[0.237,0.982],
  //   'lineTo',[0.195,0.841],
  //   'lineTo',[0.039,0.878],
  //   'lineTo',[0.017,0.874],
  //   'lineTo',[0,0.857],
  //   'bezierCurveTo',[-0.001,0.85,0.001,0.844,0.005,0.838],
  //   'lineTo',[0.174,0.574],
  //   'lineTo',[0.177,0.571],
  //   'bezierCurveTo',[0.127,0.51,0.102,0.439,0.102,0.359],
  //   'bezierCurveTo',[0.102,0.259,0.14,0.174,0.215,0.104],
  //   'bezierCurveTo',[0.293,0.035,0.389,0,0.502,0],
  //   'bezierCurveTo',[0.613,0,0.707,0.035,0.785,0.104],
  //   'bezierCurveTo',[0.863,0.174,0.902,0.259,0.902,0.359],
  // ],
  // HAND: [
  //   'moveTo',[-0.022,-0.537],
  //   'bezierCurveTo',[-0.118,-0.449,-0.198,-0.6,-0.248,-0.627],
  //   'bezierCurveTo',[-0.27,-0.639,-0.306,-0.648,-0.325,-0.631],
  //   'bezierCurveTo',[-0.344,-0.612,-0.331,-0.577,-0.329,-0.551],
  //   'bezierCurveTo',[-0.316,-0.423,-0.275,-0.297,-0.277,-0.168],
  //   'bezierCurveTo',[-0.278,-0.138,-0.306,-0.101,-0.337,-0.098],
  //   'bezierCurveTo',[-0.368,-0.094,-0.402,-0.124,-0.413,-0.153],
  //   'bezierCurveTo',[-0.449,-0.249,-0.448,-0.354,-0.47,-0.453],
  //   'bezierCurveTo',[-0.509,-0.631,-0.396,0,-0.567,0],
  //   'bezierCurveTo',[-0.597,0,-0.631,-0.032,-0.635,-0.062],
  //   'bezierCurveTo',[-0.655,-0.191,-0.634,-0.324,-0.636,-0.455],
  //   'bezierCurveTo',[-0.638,-0.568,-0.634,-0.073,-0.781,-0.097],
  //   'bezierCurveTo',[-0.812,-0.102,-0.836,-0.141,-0.836,-0.171],
  //   'bezierCurveTo',[-0.836,-0.292,-0.798,-0.41,-0.782,-0.53],
  //   'bezierCurveTo',[-0.773,-0.6,-0.827,-0.393,-0.868,-0.336],
  //   'bezierCurveTo',[-0.9,-0.29,-1.02,-0.261,-0.997,-0.377],
  //   'bezierCurveTo',[-0.945,-0.64,-0.882,-0.928,-0.567,-0.996],
  //   'bezierCurveTo',[-0.484,-1.014,-0.396,-0.966,-0.325,-0.921],
  //   'bezierCurveTo',[-0.209,-0.849,-0.101,-0.758,-0.017,-0.651],
  //   'bezierCurveTo',[0.007,-0.621,0.006,-0.563,-0.022,-0.537],
  // ],
  // TIMER: [
  //   'moveTo',[0.377,-0.955],
  //   'quadraticCurveTo',[0.5,-1.047,0.623,-0.955],
  //   'lineTo',[0.911,-0.739],
  //   'quadraticCurveTo',[1.034,-0.648,0.987,-0.499],
  //   'lineTo',[0.877,-0.15],
  //   'quadraticCurveTo',[0.83,-0.001,0.678,-0.001],
  //   'lineTo',[0.322,-0.001],
  //   'quadraticCurveTo',[0.17,-0.001,0.123,-0.15],
  //   'lineTo',[0.013,-0.499],
  //   'quadraticCurveTo',[-0.034,-0.648,0.089,-0.739],
  // ],
  DIAMOND: [
    'moveTo',[0.98,0.766],
    'bezierCurveTo',[0.992,0.754,0.999,0.737,1,0.716],
    'bezierCurveTo',[1.001,0.698,0.996,0.68,0.986,0.664],
    'lineTo',[0.547,0.024],
    'lineTo',[0.518,0],
    'lineTo',[0.483,0],
    'bezierCurveTo',[0.471,0.005,0.462,0.013,0.454,0.024],
    'lineTo',[0.015,0.664],
    'bezierCurveTo',[0.004,0.68,-0.001,0.698,0,0.716],
    'bezierCurveTo',[0.001,0.735,0.007,0.751,0.018,0.764],
    'lineTo',[0.194,0.978],
    'bezierCurveTo',[0.206,0.993,0.22,1,0.236,1],
    'lineTo',[0.75,1],
    'bezierCurveTo',[0.766,1,0.78,0.993,0.791,0.98],
    'lineTo',[0.98,0.766],
  ],
  CHECKMARK: [
    'moveTo',[0.234,0.791],
    'bezierCurveTo',[0.246,0.79,0.257,0.784,0.266,0.774],
    'lineTo',[0.423,0.561],
    'lineTo',[0.736,0.981],
    'bezierCurveTo',[0.743,0.991,0.753,0.998,0.765,1],
    'bezierCurveTo',[0.778,1.001,0.789,0.997,0.798,0.988],
    'lineTo',[0.984,0.807],
    'bezierCurveTo',[0.994,0.799,0.999,0.788,1,0.774],
    'bezierCurveTo',[1.001,0.76,0.998,0.747,0.991,0.735],
    'lineTo',[0.459,0.016],
    'lineTo',[0.437,0],
    'lineTo',[0.412,0],
    'lineTo',[0.388,0.016],
    'lineTo',[0.011,0.526],
    'bezierCurveTo',[0.003,0.538,-0.001,0.55,0,0.563],
    'bezierCurveTo',[0.001,0.579,0.007,0.59,0.016,0.599],
    'lineTo',[0.201,0.779],
    'bezierCurveTo',[0.211,0.789,0.222,0.793,0.234,0.791],
  ],
  WRENCH: [
    'moveTo',[0.563,0.093],
    'bezierCurveTo',[0.62,0.145,0.653,0.21,0.663,0.286],
    'lineTo',[0.663,0.289],
    'lineTo',[0.663,0.291],
    'lineTo',[0.663,0.336],
    'lineTo',[0.66,0.373],
    'lineTo',[0.939,0.651],
    'bezierCurveTo',[0.975,0.682,0.995,0.721,0.999,0.767],
    'lineTo',[1,0.796],
    'bezierCurveTo',[1,0.854,0.981,0.903,0.941,0.942],
    'lineTo',[0.939,0.943],
    'bezierCurveTo',[0.903,0.981,0.854,1,0.793,1],
    'bezierCurveTo',[0.737,1,0.689,0.981,0.647,0.943],
    'lineTo',[0.647,0.942],
    'lineTo',[0.461,0.756],
    'lineTo',[0.457,0.744],
    'lineTo',[0.364,0.656],
    'lineTo',[0.282,0.651],
    'lineTo',[0.285,0.653],
    'bezierCurveTo',[0.212,0.641,0.15,0.611,0.099,0.561],
    'lineTo',[0.099,0.56],
    'bezierCurveTo',[0.025,0.482,-0.007,0.396,0.002,0.302],
    'bezierCurveTo',[0.003,0.271,0.009,0.241,0.021,0.211],
    'bezierCurveTo',[0.023,0.204,0.026,0.2,0.032,0.197],
    'lineTo',[0.047,0.193],
    'lineTo',[0.06,0.201],
    'lineTo',[0.238,0.381],
    'lineTo',[0.272,0.399],
    'lineTo',[0.304,0.382],
    'lineTo',[0.304,0.381],
    'lineTo',[0.379,0.302],
    'bezierCurveTo',[0.394,0.287,0.398,0.271,0.391,0.255],
    'lineTo',[0.377,0.233],
    'lineTo',[0.199,0.061],
    'lineTo',[0.193,0.049],
    'bezierCurveTo',[0.19,0.042,0.191,0.037,0.194,0.033],
    'bezierCurveTo',[0.196,0.028,0.2,0.024,0.205,0.022],
    'bezierCurveTo',[0.219,0.015,0.232,0.009,0.244,0.005],
    'lineTo',[0.246,0.005],
    'lineTo',[0.394,0],
    'bezierCurveTo',[0.459,0.012,0.515,0.042,0.564,0.093],
    'lineTo',[0.563,0.093],
  ],
  GEAR: [
    'moveTo',[0.963,0.306],
    'bezierCurveTo',[0.988,0.366,1,0.43,1,0.5],
    'bezierCurveTo',[1,0.51,0.996,0.519,0.989,0.527],
    'bezierCurveTo',[0.982,0.534,0.973,0.538,0.963,0.538],
    'lineTo',[0.859,0.538],
    'lineTo',[0.847,0.602],
    'lineTo',[0.944,0.642],
    'lineTo',[0.964,0.663],
    'bezierCurveTo',[0.968,0.672,0.968,0.681,0.964,0.691],
    'bezierCurveTo',[0.94,0.75,0.903,0.805,0.853,0.855],
    'lineTo',[0.828,0.864],
    'lineTo',[0.802,0.855],
    'lineTo',[0.728,0.781],
    'lineTo',[0.673,0.819],
    'lineTo',[0.714,0.914],
    'bezierCurveTo',[0.718,0.923,0.718,0.933,0.714,0.942],
    'lineTo',[0.694,0.963],
    'bezierCurveTo',[0.634,0.988,0.57,1,0.5,1],
    'bezierCurveTo',[0.49,1,0.481,0.996,0.473,0.989],
    'bezierCurveTo',[0.466,0.982,0.463,0.973,0.463,0.963],
    'lineTo',[0.463,0.859],
    'lineTo',[0.398,0.848],
    'lineTo',[0.359,0.944],
    'lineTo',[0.339,0.964],
    'bezierCurveTo',[0.33,0.968,0.32,0.968,0.311,0.964],
    'bezierCurveTo',[0.251,0.94,0.196,0.904,0.147,0.855],
    'bezierCurveTo',[0.14,0.847,0.136,0.839,0.136,0.828],
    'bezierCurveTo',[0.136,0.818,0.14,0.809,0.147,0.802],
    'lineTo',[0.22,0.728],
    'lineTo',[0.183,0.673],
    'lineTo',[0.086,0.714],
    'bezierCurveTo',[0.077,0.718,0.067,0.718,0.058,0.714],
    'lineTo',[0.038,0.694],
    'bezierCurveTo',[0.013,0.634,0,0.57,0,0.5],
    'bezierCurveTo',[0,0.49,0.004,0.481,0.011,0.473],
    'bezierCurveTo',[0.018,0.466,0.027,0.463,0.038,0.463],
    'lineTo',[0.141,0.463],
    'lineTo',[0.153,0.398],
    'lineTo',[0.056,0.359],
    'lineTo',[0.036,0.339],
    'bezierCurveTo',[0.032,0.33,0.032,0.32,0.036,0.311],
    'bezierCurveTo',[0.06,0.251,0.097,0.196,0.147,0.147],
    'bezierCurveTo',[0.154,0.14,0.163,0.136,0.172,0.136],
    'bezierCurveTo',[0.182,0.136,0.191,0.14,0.198,0.147],
    'lineTo',[0.272,0.22],
    'bezierCurveTo',[0.29,0.206,0.308,0.193,0.327,0.183],
    'lineTo',[0.286,0.086],
    'bezierCurveTo',[0.282,0.077,0.282,0.067,0.286,0.058],
    'bezierCurveTo',[0.29,0.048,0.297,0.042,0.306,0.038],
    'bezierCurveTo',[0.366,0.013,0.43,0,0.5,0],
    'bezierCurveTo',[0.51,0,0.519,0.004,0.527,0.011],
    'bezierCurveTo',[0.534,0.018,0.538,0.027,0.538,0.038],
    'lineTo',[0.538,0.141],
    'lineTo',[0.602,0.153],
    'lineTo',[0.642,0.056],
    'bezierCurveTo',[0.645,0.047,0.652,0.04,0.661,0.036],
    'bezierCurveTo',[0.67,0.032,0.68,0.032,0.691,0.036],
    'bezierCurveTo',[0.729,0.052,0.766,0.073,0.802,0.1],
    'lineTo',[0.853,0.147],
    'bezierCurveTo',[0.86,0.154,0.864,0.163,0.864,0.173],
    'lineTo',[0.853,0.198],
    'lineTo',[0.781,0.272],
    'lineTo',[0.817,0.327],
    'lineTo',[0.914,0.286],
    'bezierCurveTo',[0.923,0.282,0.933,0.282,0.942,0.286],
    'lineTo',[0.963,0.306],
  ],
  KEY: [
    'moveTo',[0.867,0.098],
    'bezierCurveTo',[0.868,0.119,0.865,0.137,0.857,0.153],
    'lineTo',[0.982,0.296],
    'bezierCurveTo',[1.006,0.324,1.006,0.352,0.982,0.38],
    'lineTo',[0.954,0.411],
    'lineTo',[0.941,0.42],
    'lineTo',[0.929,0.413],
    'lineTo',[0.91,0.391],
    'lineTo',[0.844,0.47],
    'lineTo',[0.863,0.49],
    'lineTo',[0.867,0.503],
    'lineTo',[0.861,0.518],
    'lineTo',[0.835,0.55],
    'bezierCurveTo',[0.809,0.579,0.784,0.579,0.76,0.55],
    'lineTo',[0.635,0.406],
    'lineTo',[0.516,0.547],
    'bezierCurveTo',[0.54,0.592,0.557,0.641,0.566,0.693],
    'lineTo',[0.563,0.695],
    'bezierCurveTo',[0.578,0.791,0.559,0.867,0.505,0.924],
    'bezierCurveTo',[0.455,0.987,0.387,1.011,0.303,0.995],
    'bezierCurveTo',[0.236,0.982,0.175,0.946,0.12,0.889],
    'lineTo',[0.109,0.875],
    'bezierCurveTo',[0.051,0.811,0.016,0.738,0.004,0.657],
    'lineTo',[0.004,0.655],
    'bezierCurveTo',[-0.001,0.624,-0.001,0.595,0.003,0.57],
    'bezierCurveTo',[0.006,0.51,0.026,0.46,0.063,0.42],
    'bezierCurveTo',[0.099,0.377,0.143,0.354,0.194,0.348],
    'lineTo',[0.266,0.351],
    'lineTo',[0.27,0.351],
    'bezierCurveTo',[0.313,0.36,0.354,0.379,0.392,0.406],
    'lineTo',[0.727,0.021],
    'bezierCurveTo',[0.74,0.004,0.759,-0.003,0.783,0.001],
    'bezierCurveTo',[0.805,0.004,0.824,0.015,0.839,0.034],
    'lineTo',[0.852,0.048],
    'bezierCurveTo',[0.862,0.062,0.867,0.079,0.867,0.098],
  ],
  MUSICNOTE: [
    'moveTo',[1,0.906],
    'lineTo',[1,0.419],
    'lineTo',[1,0.408],
    'bezierCurveTo',[0.993,0.349,0.968,0.3,0.926,0.263],
    'lineTo',[0.922,0.263],
    'bezierCurveTo',[0.878,0.22,0.825,0.196,0.765,0.192],
    'lineTo',[0.763,0.192],
    'bezierCurveTo',[0.7,0.186,0.647,0.203,0.606,0.242],
    'bezierCurveTo',[0.565,0.276,0.547,0.322,0.554,0.38],
    'bezierCurveTo',[0.56,0.432,0.584,0.477,0.628,0.516],
    'bezierCurveTo',[0.67,0.553,0.715,0.574,0.765,0.58],
    'lineTo',[0.815,0.58],
    'lineTo',[0.815,0.742],
    'lineTo',[0.444,0.742],
    'lineTo',[0.444,0.193],
    'bezierCurveTo',[0.447,0.152,0.422,0.111,0.368,0.071],
    'lineTo',[0.367,0.066],
    'bezierCurveTo',[0.322,0.028,0.271,0.007,0.213,0.001],
    'lineTo',[0.211,0.001],
    'bezierCurveTo',[0.147,-0.004,0.094,0.011,0.054,0.048],
    'bezierCurveTo',[0.012,0.083,-0.006,0.129,0.002,0.184],
    'bezierCurveTo',[0.007,0.237,0.031,0.284,0.074,0.324],
    'lineTo',[0.078,0.326],
    'bezierCurveTo',[0.118,0.36,0.163,0.381,0.211,0.39],
    'lineTo',[0.213,0.39],
    'lineTo',[0.296,0.387],
    'lineTo',[0.296,0.903],
    'bezierCurveTo',[0.294,0.97,0.324,1.002,0.387,1],
    'lineTo',[0.889,1],
    'bezierCurveTo',[0.963,1,1,0.969,1,0.906],
  ],
  LOCK: [
    'moveTo',[0.875,0.895],
    'lineTo',[0.875,0.789],
    'lineTo',[0.75,0.789],
    'lineTo',[0.75,0.895],
    'lineTo',[0.25,0.895],
    'lineTo',[0.25,0.526],
    'lineTo',[1,0.526],
    'lineTo',[1,0.053],
    'bezierCurveTo',[1,0.038,0.994,0.025,0.981,0.014],
    'bezierCurveTo',[0.969,0.005,0.954,0,0.938,0],
    'lineTo',[0.063,0],
    'bezierCurveTo',[0.045,0,0.03,0.005,0.017,0.014],
    'bezierCurveTo',[0.006,0.025,0,0.038,0,0.053],
    'lineTo',[0,0.526],
    'lineTo',[0.125,0.526],
    'lineTo',[0.125,0.895],
    'bezierCurveTo',[0.125,0.924,0.137,0.948,0.161,0.968],
    'bezierCurveTo',[0.186,0.989,0.216,1,0.25,1],
    'lineTo',[0.75,1],
    'bezierCurveTo',[0.784,1,0.814,0.989,0.838,0.968],
    'bezierCurveTo',[0.863,0.947,0.875,0.923,0.875,0.895],
  ],
  HEART: [
    'moveTo',[0.528,0.903],
    'bezierCurveTo',[0.58,0.968,0.644,1,0.722,1],
    'bezierCurveTo',[0.798,1,0.864,0.968,0.919,0.903],
    'lineTo',[0.922,0.903],
    'bezierCurveTo',[0.974,0.839,1,0.764,1,0.678],
    'bezierCurveTo',[1,0.605,0.982,0.542,0.944,0.488],
    'lineTo',[0.919,0.453],
    'lineTo',[0.539,0.019],
    'lineTo',[0.5,0],
    'bezierCurveTo',[0.485,0,0.472,0.006,0.461,0.019],
    'lineTo',[0.081,0.453],
    'lineTo',[0.056,0.488],
    'bezierCurveTo',[0.019,0.542,0,0.605,0,0.678],
    'bezierCurveTo',[0,0.764,0.027,0.839,0.081,0.903],
    'bezierCurveTo',[0.136,0.968,0.202,1,0.278,1],
    'bezierCurveTo',[0.356,1,0.42,0.968,0.472,0.903],
    'lineTo',[0.528,0.903],
  ],
  HOUSE: [
    'moveTo',[0.375,0],
    'lineTo',[0.188,0],
    'bezierCurveTo',[0.17,0,0.155,0.006,0.142,0.017],
    'bezierCurveTo',[0.131,0.03,0.125,0.045,0.125,0.062],
    'lineTo',[0.125,0.375],
    'lineTo',[0,0.375],
    'lineTo',[0,0.5],
    'lineTo',[0.5,1],
    'lineTo',[1,0.5],
    'lineTo',[1,0.375],
    'lineTo',[0.875,0.375],
    'lineTo',[0.875,0.062],
    'bezierCurveTo',[0.875,0.045,0.869,0.03,0.856,0.017],
    'bezierCurveTo',[0.844,0.006,0.829,0,0.813,0],
    'lineTo',[0.625,0],
    'lineTo',[0.625,0.375],
    'lineTo',[0.375,0.375],
    'lineTo',[0.375,0],
  ],
};
