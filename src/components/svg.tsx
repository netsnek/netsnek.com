const [values, setValues] = React.useState<{
  content: string;
}>({
  content: JSON.stringify(
    {
      "type": "root",
      "children": [
        {
          "type": "mdxJsxFlowElement",
          "name": "svg",
          "attributes": [
            {
              "type": "mdxJsxAttribute",
              "name": "xmlns",
              "value": "http://www.w3.org/2000/svg",
              "position": {
                "start": {
                  "line": 2,
                  "column": 1,
                  "offset": 5
                },
                "end": {
                  "line": 2,
                  "column": 35,
                  "offset": 39
                }
              }
            },
            {
              "type": "mdxJsxAttribute",
              "name": "width",
              "value": "full",
              "position": {
                "start": {
                  "line": 3,
                  "column": 3,
                  "offset": 42
                },
                "end": {
                  "line": 3,
                  "column": 15,
                  "offset": 54
                }
              }
            },
            {
              "type": "mdxJsxAttribute",
              "name": "height",
              "value": "full",
              "position": {
                "start": {
                  "line": 4,
                  "column": 3,
                  "offset": 57
                },
                "end": {
                  "line": 4,
                  "column": 16,
                  "offset": 70
                }
              }
            },
            {
              "type": "mdxJsxAttribute",
              "name": "viewBox",
              "value": "0 0 475 475",
              "position": {
                "start": {
                  "line": 5,
                  "column": 3,
                  "offset": 73
                },
                "end": {
                  "line": 5,
                  "column": 24,
                  "offset": 94
                }
              }
            },
            {
              "type": "mdxJsxAttribute",
              "name": "sx",
              "value": {
                "type": "mdxJsxAttributeValueExpression",
                "value": "{\n    '.snek': {\n      fill: 'currentColor',\n    },\n  }",
                "data": {
                  "estree": {
                    "type": "Program",
                    "start": 101,
                    "end": 156,
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "expression": {
                          "type": "ObjectExpression",
                          "start": 101,
                          "end": 156,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 6,
                              "offset": 101
                            },
                            "end": {
                              "line": 10,
                              "column": 3,
                              "offset": 156
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 107,
                              "end": 151,
                              "loc": {
                                "start": {
                                  "line": 7,
                                  "column": 4,
                                  "offset": 107
                                },
                                "end": {
                                  "line": 9,
                                  "column": 5,
                                  "offset": 151
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Literal",
                                "start": 107,
                                "end": 114,
                                "loc": {
                                  "start": {
                                    "line": 7,
                                    "column": 4,
                                    "offset": 107
                                  },
                                  "end": {
                                    "line": 7,
                                    "column": 11,
                                    "offset": 114
                                  }
                                },
                                "value": ".snek",
                                "raw": "'.snek'",
                                "range": [
                                  107,
                                  114
                                ]
                              },
                              "value": {
                                "type": "ObjectExpression",
                                "start": 116,
                                "end": 151,
                                "loc": {
                                  "start": {
                                    "line": 7,
                                    "column": 13,
                                    "offset": 116
                                  },
                                  "end": {
                                    "line": 9,
                                    "column": 5,
                                    "offset": 151
                                  }
                                },
                                "properties": [
                                  {
                                    "type": "Property",
                                    "start": 124,
                                    "end": 144,
                                    "loc": {
                                      "start": {
                                        "line": 8,
                                        "column": 6,
                                        "offset": 124
                                      },
                                      "end": {
                                        "line": 8,
                                        "column": 26,
                                        "offset": 144
                                      }
                                    },
                                    "method": false,
                                    "shorthand": false,
                                    "computed": false,
                                    "key": {
                                      "type": "Identifier",
                                      "start": 124,
                                      "end": 128,
                                      "loc": {
                                        "start": {
                                          "line": 8,
                                          "column": 6,
                                          "offset": 124
                                        },
                                        "end": {
                                          "line": 8,
                                          "column": 10,
                                          "offset": 128
                                        }
                                      },
                                      "name": "fill",
                                      "range": [
                                        124,
                                        128
                                      ]
                                    },
                                    "value": {
                                      "type": "Literal",
                                      "start": 130,
                                      "end": 144,
                                      "loc": {
                                        "start": {
                                          "line": 8,
                                          "column": 12,
                                          "offset": 130
                                        },
                                        "end": {
                                          "line": 8,
                                          "column": 26,
                                          "offset": 144
                                        }
                                      },
                                      "value": "currentColor",
                                      "raw": "'currentColor'",
                                      "range": [
                                        130,
                                        144
                                      ]
                                    },
                                    "kind": "init",
                                    "range": [
                                      124,
                                      144
                                    ]
                                  }
                                ],
                                "range": [
                                  116,
                                  151
                                ]
                              },
                              "kind": "init",
                              "range": [
                                107,
                                151
                              ]
                            }
                          ],
                          "range": [
                            101,
                            156
                          ]
                        },
                        "start": 101,
                        "end": 156,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 6,
                            "offset": 101
                          },
                          "end": {
                            "line": 10,
                            "column": 3,
                            "offset": 156
                          }
                        },
                        "range": [
                          101,
                          156
                        ]
                      }
                    ],
                    "sourceType": "module",
                    "comments": [

                    ],
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 6,
                        "offset": 101
                      },
                      "end": {
                        "line": 10,
                        "column": 3,
                        "offset": 156
                      }
                    },
                    "range": [
                      101,
                      156
                    ]
                  }
                }
              },
              "position": {
                "start": {
                  "line": 6,
                  "column": 3,
                  "offset": 97
                },
                "end": {
                  "line": 10,
                  "column": 5,
                  "offset": 157
                }
              }
            },
            {
              "type": "mdxJsxExpressionAttribute",
              "value": "...props",
              "data": {
                "estree": {
                  "type": "Program",
                  "start": 161,
                  "end": 169,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "expression": {
                        "type": "ObjectExpression",
                        "start": 161,
                        "end": 169,
                        "loc": {
                          "start": {
                            "line": 11,
                            "column": 3,
                            "offset": 161
                          },
                          "end": {
                            "line": 11,
                            "column": 11,
                            "offset": 169
                          }
                        },
                        "properties": [
                          {
                            "type": "SpreadElement",
                            "start": 161,
                            "end": 169,
                            "loc": {
                              "start": {
                                "line": 11,
                                "column": 3,
                                "offset": 161
                              },
                              "end": {
                                "line": 11,
                                "column": 11,
                                "offset": 169
                              }
                            },
                            "argument": {
                              "type": "Identifier",
                              "start": 164,
                              "end": 169,
                              "loc": {
                                "start": {
                                  "line": 11,
                                  "column": 6,
                                  "offset": 164
                                },
                                "end": {
                                  "line": 11,
                                  "column": 11,
                                  "offset": 169
                                }
                              },
                              "name": "props",
                              "range": [
                                164,
                                169
                              ]
                            },
                            "range": [
                              161,
                              169
                            ]
                          }
                        ],
                        "range": [
                          161,
                          169
                        ]
                      },
                      "start": 161,
                      "end": 169,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 3,
                          "offset": 161
                        },
                        "end": {
                          "line": 11,
                          "column": 11,
                          "offset": 169
                        }
                      },
                      "range": [
                        161,
                        169
                      ]
                    }
                  ],
                  "sourceType": "module",
                  "comments": [

                  ],
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 3,
                      "offset": 161
                    },
                    "end": {
                      "line": 11,
                      "column": 11,
                      "offset": 169
                    }
                  },
                  "range": [
                    161,
                    169
                  ]
                }
              }
            }
          ],
          "children": [
            {
              "type": "mdxJsxFlowElement",
              "name": "style",
              "attributes": [

              ],
              "children": [
                {
                  "type": "mdxFlowExpression",
                  "value": "`\n  @keyframes draw {\n    100% {\n      stroke-dashoffset: 0;\n    }\n  }\n\n  @keyframes erase {\n    100% {\n      stroke: transparent;\n    }\n  }\n\n  @keyframes heartbeat {\n    0% {\n      transform: scale(1);\n    }\n    40% {\n      transform: scale(1);\n    }\n    50% {\n      transform: scale(0.8);\n    }\n    55% {\n      transform: scale(0.9);\n    }\n    60% {\n      transform: scale(0.7);\n    }\n  }\n\n  @keyframes move-layer2 {\n    100% {\n      transform: translateX(250px) translateY(100px) scale(0.5);\n    }\n  }\n\n  @keyframes move-circle1 {\n    100% {\n      transform: translateY(-50px);\n    }\n  }\n\n  @keyframes move-circle2 {\n    100% {\n      transform: translateX(50px);\n    }\n  }\n\n  @keyframes rotate-heart-wrap {\n    100% {\n      transform: translateX(5px) translateY(-8px) rotate(-45deg);\n    }\n  }\n\n  @keyframes fill-heart {\n    to {\n      fill: #f77f00;\n    }\n  }\n\n  @keyframes fill-snek {\n    to {\n      fill: #fff;\n    }\n  }\n\n  .rect, .circles, .heart {\n    stroke-dasharray: 1000;\n    stroke-dashoffset: 1000;\n  }\n\n  .rect {\n    animation: draw 2s ease forwards, /* Drawing animation */\n               erase 1s ease 6s forwards; /* Remove drawing */\n  }\n\n  #layer2 {\n    animation: move-layer2 1s 9s forwards; /* Movement animation after the first one finishes */\n  }\n\n  #circle1 {\n    animation: draw 2s ease 1s forwards, /* Drawing animation */\n               erase 1s ease 6s forwards, /* Remove drawing */\n               move-circle1 1s 3s forwards; /* Movement animation after the first one finishes */\n  }\n\n  #circle2 {\n    animation: draw 2s ease 1s forwards, /* Drawing animation */\n               erase 1s ease 6s forwards, /* Remove drawing */\n               move-circle2 1s 3s forwards; /* Movement animation after the first one finishes */\n  }\n\n  .heart-wrap {\n    animation: rotate-heart-wrap 1s 4s forwards; /* Rotate animation with delay */\n    transform-origin: center; /* Ensure rotation is around the center */\n  }\n\n  #heart {\n    animation: draw 2s ease 5s forwards, /* Drawing animation with delay */\n                   fill-heart 0s ease 6s forwards, /* Fill animation */\n               heartbeat 1s infinite 9s; /* Heartbeat animation */\n    strokeWidth: 2;\n    fill: transparent; /* No fill initially */\n    transform-origin: center; /* Ensure heartbeat is around the center */\n  }\n\n  #snek-mask path {\n    transform-origin: center;\n    transform: rotate(-148deg);\n    animation: fill-snek 0s ease 7s forwards; /* Fill animation */\n  }\n\n  #heading1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 10s forwards;\n  }\n\n  #heading2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 11s forwards;\n  }\n\n  #dot1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 10s forwards;\n  }\n\n  #dot2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 11s forwards;\n  }\n\n  #button {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 13s forwards;\n  }\n\n  #skeleton1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 12s forwards;\n  }\n\n  #skeleton2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 12s forwards;\n  }\n\n  .snek {\n    transform-origin: center;\n    transform: rotate(148deg);\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 2s ease 7s forwards;\n  }\n`",
                  "position": {
                    "start": {
                      "line": 13,
                      "column": 10,
                      "offset": 182
                    },
                    "end": {
                      "line": 175,
                      "column": 3,
                      "offset": 4319
                    }
                  },
                  "data": {
                    "estree": {
                      "type": "Program",
                      "start": 183,
                      "end": 4318,
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "expression": {
                            "type": "TemplateLiteral",
                            "start": 183,
                            "end": 4318,
                            "expressions": [

                            ],
                            "quasis": [
                              {
                                "type": "TemplateElement",
                                "start": 184,
                                "end": 4317,
                                "value": {
                                  "raw": "\n  @keyframes draw {\n    100% {\n      stroke-dashoffset: 0;\n    }\n  }\n\n  @keyframes erase {\n    100% {\n      stroke: transparent;\n    }\n  }\n\n  @keyframes heartbeat {\n    0% {\n      transform: scale(1);\n    }\n    40% {\n      transform: scale(1);\n    }\n    50% {\n      transform: scale(0.8);\n    }\n    55% {\n      transform: scale(0.9);\n    }\n    60% {\n      transform: scale(0.7);\n    }\n  }\n\n  @keyframes move-layer2 {\n    100% {\n      transform: translateX(250px) translateY(100px) scale(0.5);\n    }\n  }\n\n  @keyframes move-circle1 {\n    100% {\n      transform: translateY(-50px);\n    }\n  }\n\n  @keyframes move-circle2 {\n    100% {\n      transform: translateX(50px);\n    }\n  }\n\n  @keyframes rotate-heart-wrap {\n    100% {\n      transform: translateX(5px) translateY(-8px) rotate(-45deg);\n    }\n  }\n\n  @keyframes fill-heart {\n    to {\n      fill: #f77f00;\n    }\n  }\n\n  @keyframes fill-snek {\n    to {\n      fill: #fff;\n    }\n  }\n\n  .rect, .circles, .heart {\n    stroke-dasharray: 1000;\n    stroke-dashoffset: 1000;\n  }\n\n  .rect {\n    animation: draw 2s ease forwards, /* Drawing animation */\n               erase 1s ease 6s forwards; /* Remove drawing */\n  }\n\n  #layer2 {\n    animation: move-layer2 1s 9s forwards; /* Movement animation after the first one finishes */\n  }\n\n  #circle1 {\n    animation: draw 2s ease 1s forwards, /* Drawing animation */\n               erase 1s ease 6s forwards, /* Remove drawing */\n               move-circle1 1s 3s forwards; /* Movement animation after the first one finishes */\n  }\n\n  #circle2 {\n    animation: draw 2s ease 1s forwards, /* Drawing animation */\n               erase 1s ease 6s forwards, /* Remove drawing */\n               move-circle2 1s 3s forwards; /* Movement animation after the first one finishes */\n  }\n\n  .heart-wrap {\n    animation: rotate-heart-wrap 1s 4s forwards; /* Rotate animation with delay */\n    transform-origin: center; /* Ensure rotation is around the center */\n  }\n\n  #heart {\n    animation: draw 2s ease 5s forwards, /* Drawing animation with delay */\n                   fill-heart 0s ease 6s forwards, /* Fill animation */\n               heartbeat 1s infinite 9s; /* Heartbeat animation */\n    strokeWidth: 2;\n    fill: transparent; /* No fill initially */\n    transform-origin: center; /* Ensure heartbeat is around the center */\n  }\n\n  #snek-mask path {\n    transform-origin: center;\n    transform: rotate(-148deg);\n    animation: fill-snek 0s ease 7s forwards; /* Fill animation */\n  }\n\n  #heading1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 10s forwards;\n  }\n\n  #heading2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 11s forwards;\n  }\n\n  #dot1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 10s forwards;\n  }\n\n  #dot2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 11s forwards;\n  }\n\n  #button {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 13s forwards;\n  }\n\n  #skeleton1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 12s forwards;\n  }\n\n  #skeleton2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 12s forwards;\n  }\n\n  .snek {\n    transform-origin: center;\n    transform: rotate(148deg);\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 2s ease 7s forwards;\n  }\n",
                                  "cooked": "\n  @keyframes draw {\n    100% {\n      stroke-dashoffset: 0;\n    }\n  }\n\n  @keyframes erase {\n    100% {\n      stroke: transparent;\n    }\n  }\n\n  @keyframes heartbeat {\n    0% {\n      transform: scale(1);\n    }\n    40% {\n      transform: scale(1);\n    }\n    50% {\n      transform: scale(0.8);\n    }\n    55% {\n      transform: scale(0.9);\n    }\n    60% {\n      transform: scale(0.7);\n    }\n  }\n\n  @keyframes move-layer2 {\n    100% {\n      transform: translateX(250px) translateY(100px) scale(0.5);\n    }\n  }\n\n  @keyframes move-circle1 {\n    100% {\n      transform: translateY(-50px);\n    }\n  }\n\n  @keyframes move-circle2 {\n    100% {\n      transform: translateX(50px);\n    }\n  }\n\n  @keyframes rotate-heart-wrap {\n    100% {\n      transform: translateX(5px) translateY(-8px) rotate(-45deg);\n    }\n  }\n\n  @keyframes fill-heart {\n    to {\n      fill: #f77f00;\n    }\n  }\n\n  @keyframes fill-snek {\n    to {\n      fill: #fff;\n    }\n  }\n\n  .rect, .circles, .heart {\n    stroke-dasharray: 1000;\n    stroke-dashoffset: 1000;\n  }\n\n  .rect {\n    animation: draw 2s ease forwards, /* Drawing animation */\n               erase 1s ease 6s forwards; /* Remove drawing */\n  }\n\n  #layer2 {\n    animation: move-layer2 1s 9s forwards; /* Movement animation after the first one finishes */\n  }\n\n  #circle1 {\n    animation: draw 2s ease 1s forwards, /* Drawing animation */\n               erase 1s ease 6s forwards, /* Remove drawing */\n               move-circle1 1s 3s forwards; /* Movement animation after the first one finishes */\n  }\n\n  #circle2 {\n    animation: draw 2s ease 1s forwards, /* Drawing animation */\n               erase 1s ease 6s forwards, /* Remove drawing */\n               move-circle2 1s 3s forwards; /* Movement animation after the first one finishes */\n  }\n\n  .heart-wrap {\n    animation: rotate-heart-wrap 1s 4s forwards; /* Rotate animation with delay */\n    transform-origin: center; /* Ensure rotation is around the center */\n  }\n\n  #heart {\n    animation: draw 2s ease 5s forwards, /* Drawing animation with delay */\n                   fill-heart 0s ease 6s forwards, /* Fill animation */\n               heartbeat 1s infinite 9s; /* Heartbeat animation */\n    strokeWidth: 2;\n    fill: transparent; /* No fill initially */\n    transform-origin: center; /* Ensure heartbeat is around the center */\n  }\n\n  #snek-mask path {\n    transform-origin: center;\n    transform: rotate(-148deg);\n    animation: fill-snek 0s ease 7s forwards; /* Fill animation */\n  }\n\n  #heading1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 10s forwards;\n  }\n\n  #heading2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 11s forwards;\n  }\n\n  #dot1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 10s forwards;\n  }\n\n  #dot2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 11s forwards;\n  }\n\n  #button {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 13s forwards;\n  }\n\n  #skeleton1 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 12s forwards;\n  }\n\n  #skeleton2 {\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 1s ease 12s forwards;\n  }\n\n  .snek {\n    transform-origin: center;\n    transform: rotate(148deg);\n    stroke-dasharray: 1005; /* Circumference of the circle */\n    stroke-dashoffset: 1005; /* Same as dash array to start with full offset */\n    animation: draw 2s ease 7s forwards;\n  }\n"
                                },
                                "tail": true,
                                "loc": {
                                  "start": {
                                    "line": 13,
                                    "column": 11,
                                    "offset": 184
                                  },
                                  "end": {
                                    "line": 175,
                                    "column": 0,
                                    "offset": 4317
                                  }
                                },
                                "range": [
                                  184,
                                  4317
                                ]
                              }
                            ],
                            "loc": {
                              "start": {
                                "line": 13,
                                "column": 10,
                                "offset": 183
                              },
                              "end": {
                                "line": 175,
                                "column": 1,
                                "offset": 4318
                              }
                            },
                            "range": [
                              183,
                              4318
                            ]
                          },
                          "start": 183,
                          "end": 4318,
                          "loc": {
                            "start": {
                              "line": 13,
                              "column": 10,
                              "offset": 183
                            },
                            "end": {
                              "line": 175,
                              "column": 1,
                              "offset": 4318
                            }
                          },
                          "range": [
                            183,
                            4318
                          ]
                        }
                      ],
                      "sourceType": "module",
                      "comments": [

                      ],
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 10,
                          "offset": 183
                        },
                        "end": {
                          "line": 175,
                          "column": 1,
                          "offset": 4318
                        }
                      },
                      "range": [
                        183,
                        4318
                      ]
                    }
                  }
                }
              ],
              "position": {
                "start": {
                  "line": 13,
                  "column": 3,
                  "offset": 175
                },
                "end": {
                  "line": 175,
                  "column": 11,
                  "offset": 4327
                }
              },
              "data": {
                "_mdxExplicitJsx": true
              }
            },
            {
              "type": "mdxJsxFlowElement",
              "name": "defs",
              "attributes": [

              ],
              "children": [
                {
                  "type": "mdxJsxFlowElement",
                  "name": "mask",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "snek-mask",
                      "position": {
                        "start": {
                          "line": 177,
                          "column": 11,
                          "offset": 4347
                        },
                        "end": {
                          "line": 177,
                          "column": 25,
                          "offset": 4361
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "path",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "d",
                          "value": "M115.86,344.56c6.1,2.2,9.35,5.73,12.93,8.68,29.63,24.4,63.36,38.86,101.89,39.72,72.77,1.62,136.15-46.28,149.93-117.76,11.6-60.18-8.13-110.08-58.01-145.77-60.09-43-143.55-29.92-188.04,28.61-29.27,38.49-35.75,81.5-20.35,127.42,3.64,10.86,3.8,20.71-3.64,29.86-6.32,7.78-14.72,10.83-24.49,9.49-11.02-1.51-18.46-7.87-22.08-18.33-5.33-15.38-8.86-31.26-9.76-47.48-3.3-59.34,15.71-110.45,59.67-150.7,39.74-36.38,87.24-52.94,141.3-47.5,80.46,8.11,144.15,64.58,159.81,142.92,19.36,96.85-40.61,189.02-136.89,206.98-60.2,11.24-113.35-5.11-154.42-53.03-2.13-2.49-3.83-5.35-5.62-8.12-.72-1.11-1.11-2.43-2.25-5.01h0Z",
                          "position": {
                            "start": {
                              "line": 179,
                              "column": 9,
                              "offset": 4383
                            },
                            "end": {
                              "line": 179,
                              "column": 614,
                              "offset": 4988
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "transparent",
                          "position": {
                            "start": {
                              "line": 180,
                              "column": 9,
                              "offset": 4997
                            },
                            "end": {
                              "line": 180,
                              "column": 27,
                              "offset": 5015
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 178,
                          "column": 7,
                          "offset": 4369
                        },
                        "end": {
                          "line": 181,
                          "column": 9,
                          "offset": 5024
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 177,
                      "column": 5,
                      "offset": 4341
                    },
                    "end": {
                      "line": 182,
                      "column": 12,
                      "offset": 5036
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "mask",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "heading1-mask",
                      "position": {
                        "start": {
                          "line": 183,
                          "column": 11,
                          "offset": 5047
                        },
                        "end": {
                          "line": 183,
                          "column": 29,
                          "offset": 5065
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "text",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "0",
                          "position": {
                            "start": {
                              "line": 184,
                              "column": 13,
                              "offset": 5079
                            },
                            "end": {
                              "line": 184,
                              "column": 18,
                              "offset": 5084
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "160",
                          "position": {
                            "start": {
                              "line": 184,
                              "column": 19,
                              "offset": 5085
                            },
                            "end": {
                              "line": 184,
                              "column": 26,
                              "offset": 5092
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fontSize",
                          "value": "32",
                          "position": {
                            "start": {
                              "line": 184,
                              "column": 27,
                              "offset": 5093
                            },
                            "end": {
                              "line": 184,
                              "column": 40,
                              "offset": 5106
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fontWeight",
                          "value": "bold",
                          "position": {
                            "start": {
                              "line": 184,
                              "column": 41,
                              "offset": 5107
                            },
                            "end": {
                              "line": 184,
                              "column": 58,
                              "offset": 5124
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "white",
                          "position": {
                            "start": {
                              "line": 184,
                              "column": 59,
                              "offset": 5125
                            },
                            "end": {
                              "line": 184,
                              "column": 71,
                              "offset": 5137
                            }
                          }
                        }
                      ],
                      "children": [
                        {
                          "type": "text",
                          "value": "Ihre Idee",
                          "position": {
                            "start": {
                              "line": 184,
                              "column": 72,
                              "offset": 5138
                            },
                            "end": {
                              "line": 184,
                              "column": 81,
                              "offset": 5147
                            }
                          }
                        }
                      ],
                      "position": {
                        "start": {
                          "line": 184,
                          "column": 7,
                          "offset": 5073
                        },
                        "end": {
                          "line": 184,
                          "column": 88,
                          "offset": 5154
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 183,
                      "column": 5,
                      "offset": 5041
                    },
                    "end": {
                      "line": 185,
                      "column": 12,
                      "offset": 5166
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "mask",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "heading2-mask",
                      "position": {
                        "start": {
                          "line": 186,
                          "column": 11,
                          "offset": 5177
                        },
                        "end": {
                          "line": 186,
                          "column": 29,
                          "offset": 5195
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "text",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "0",
                          "position": {
                            "start": {
                              "line": 187,
                              "column": 13,
                              "offset": 5209
                            },
                            "end": {
                              "line": 187,
                              "column": 18,
                              "offset": 5214
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "190",
                          "position": {
                            "start": {
                              "line": 187,
                              "column": 19,
                              "offset": 5215
                            },
                            "end": {
                              "line": 187,
                              "column": 26,
                              "offset": 5222
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fontSize",
                          "value": "24",
                          "position": {
                            "start": {
                              "line": 187,
                              "column": 27,
                              "offset": 5223
                            },
                            "end": {
                              "line": 187,
                              "column": 40,
                              "offset": 5236
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fontWeight",
                          "value": "bold",
                          "position": {
                            "start": {
                              "line": 187,
                              "column": 41,
                              "offset": 5237
                            },
                            "end": {
                              "line": 187,
                              "column": 58,
                              "offset": 5254
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "white",
                          "position": {
                            "start": {
                              "line": 187,
                              "column": 59,
                              "offset": 5255
                            },
                            "end": {
                              "line": 187,
                              "column": 71,
                              "offset": 5267
                            }
                          }
                        }
                      ],
                      "children": [
                        {
                          "type": "text",
                          "value": "Unser Know-How",
                          "position": {
                            "start": {
                              "line": 187,
                              "column": 72,
                              "offset": 5268
                            },
                            "end": {
                              "line": 187,
                              "column": 86,
                              "offset": 5282
                            }
                          }
                        }
                      ],
                      "position": {
                        "start": {
                          "line": 187,
                          "column": 7,
                          "offset": 5203
                        },
                        "end": {
                          "line": 187,
                          "column": 93,
                          "offset": 5289
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 186,
                      "column": 5,
                      "offset": 5171
                    },
                    "end": {
                      "line": 188,
                      "column": 12,
                      "offset": 5301
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "mask",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "className",
                      "value": "dots-mask",
                      "position": {
                        "start": {
                          "line": 189,
                          "column": 11,
                          "offset": 5312
                        },
                        "end": {
                          "line": 189,
                          "column": 32,
                          "offset": 5333
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "dot1-mask",
                      "position": {
                        "start": {
                          "line": 189,
                          "column": 33,
                          "offset": 5334
                        },
                        "end": {
                          "line": 189,
                          "column": 47,
                          "offset": 5348
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "text",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "0",
                          "position": {
                            "start": {
                              "line": 190,
                              "column": 13,
                              "offset": 5362
                            },
                            "end": {
                              "line": 190,
                              "column": 18,
                              "offset": 5367
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "160",
                          "position": {
                            "start": {
                              "line": 190,
                              "column": 19,
                              "offset": 5368
                            },
                            "end": {
                              "line": 190,
                              "column": 26,
                              "offset": 5375
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fontSize",
                          "value": "32",
                          "position": {
                            "start": {
                              "line": 190,
                              "column": 27,
                              "offset": 5376
                            },
                            "end": {
                              "line": 190,
                              "column": 40,
                              "offset": 5389
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fontWeight",
                          "value": "bold",
                          "position": {
                            "start": {
                              "line": 190,
                              "column": 41,
                              "offset": 5390
                            },
                            "end": {
                              "line": 190,
                              "column": 58,
                              "offset": 5407
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "black",
                          "position": {
                            "start": {
                              "line": 190,
                              "column": 59,
                              "offset": 5408
                            },
                            "end": {
                              "line": 190,
                              "column": 71,
                              "offset": 5420
                            }
                          }
                        }
                      ],
                      "children": [
                        {
                          "type": "text",
                          "value": "Ihre Idee",
                          "position": {
                            "start": {
                              "line": 190,
                              "column": 72,
                              "offset": 5421
                            },
                            "end": {
                              "line": 190,
                              "column": 81,
                              "offset": 5430
                            }
                          }
                        },
                        {
                          "type": "mdxJsxTextElement",
                          "name": "tspan",
                          "attributes": [
                            {
                              "type": "mdxJsxAttribute",
                              "name": "fill",
                              "value": "white",
                              "position": {
                                "start": {
                                  "line": 190,
                                  "column": 88,
                                  "offset": 5437
                                },
                                "end": {
                                  "line": 190,
                                  "column": 100,
                                  "offset": 5449
                                }
                              }
                            }
                          ],
                          "children": [
                            {
                              "type": "text",
                              "value": ".",
                              "position": {
                                "start": {
                                  "line": 190,
                                  "column": 101,
                                  "offset": 5450
                                },
                                "end": {
                                  "line": 190,
                                  "column": 102,
                                  "offset": 5451
                                }
                              }
                            }
                          ],
                          "position": {
                            "start": {
                              "line": 190,
                              "column": 81,
                              "offset": 5430
                            },
                            "end": {
                              "line": 190,
                              "column": 110,
                              "offset": 5459
                            }
                          },
                          "data": {
                            "_mdxExplicitJsx": true
                          }
                        }
                      ],
                      "position": {
                        "start": {
                          "line": 190,
                          "column": 7,
                          "offset": 5356
                        },
                        "end": {
                          "line": 190,
                          "column": 117,
                          "offset": 5466
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 189,
                      "column": 5,
                      "offset": 5306
                    },
                    "end": {
                      "line": 191,
                      "column": 12,
                      "offset": 5478
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "mask",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "className",
                      "value": "dots-mask",
                      "position": {
                        "start": {
                          "line": 192,
                          "column": 11,
                          "offset": 5489
                        },
                        "end": {
                          "line": 192,
                          "column": 32,
                          "offset": 5510
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "dot2-mask",
                      "position": {
                        "start": {
                          "line": 192,
                          "column": 33,
                          "offset": 5511
                        },
                        "end": {
                          "line": 192,
                          "column": 47,
                          "offset": 5525
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "text",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "0",
                          "position": {
                            "start": {
                              "line": 193,
                              "column": 13,
                              "offset": 5539
                            },
                            "end": {
                              "line": 193,
                              "column": 18,
                              "offset": 5544
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "190",
                          "position": {
                            "start": {
                              "line": 193,
                              "column": 19,
                              "offset": 5545
                            },
                            "end": {
                              "line": 193,
                              "column": 26,
                              "offset": 5552
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fontSize",
                          "value": "24",
                          "position": {
                            "start": {
                              "line": 193,
                              "column": 27,
                              "offset": 5553
                            },
                            "end": {
                              "line": 193,
                              "column": 40,
                              "offset": 5566
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fontWeight",
                          "value": "bold",
                          "position": {
                            "start": {
                              "line": 193,
                              "column": 41,
                              "offset": 5567
                            },
                            "end": {
                              "line": 193,
                              "column": 58,
                              "offset": 5584
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "black",
                          "position": {
                            "start": {
                              "line": 193,
                              "column": 59,
                              "offset": 5585
                            },
                            "end": {
                              "line": 193,
                              "column": 71,
                              "offset": 5597
                            }
                          }
                        }
                      ],
                      "children": [
                        {
                          "type": "text",
                          "value": "Unser Know-How",
                          "position": {
                            "start": {
                              "line": 193,
                              "column": 72,
                              "offset": 5598
                            },
                            "end": {
                              "line": 193,
                              "column": 86,
                              "offset": 5612
                            }
                          }
                        },
                        {
                          "type": "mdxJsxTextElement",
                          "name": "tspan",
                          "attributes": [
                            {
                              "type": "mdxJsxAttribute",
                              "name": "fill",
                              "value": "white",
                              "position": {
                                "start": {
                                  "line": 193,
                                  "column": 93,
                                  "offset": 5619
                                },
                                "end": {
                                  "line": 193,
                                  "column": 105,
                                  "offset": 5631
                                }
                              }
                            }
                          ],
                          "children": [
                            {
                              "type": "text",
                              "value": ".",
                              "position": {
                                "start": {
                                  "line": 193,
                                  "column": 106,
                                  "offset": 5632
                                },
                                "end": {
                                  "line": 193,
                                  "column": 107,
                                  "offset": 5633
                                }
                              }
                            }
                          ],
                          "position": {
                            "start": {
                              "line": 193,
                              "column": 86,
                              "offset": 5612
                            },
                            "end": {
                              "line": 193,
                              "column": 115,
                              "offset": 5641
                            }
                          },
                          "data": {
                            "_mdxExplicitJsx": true
                          }
                        }
                      ],
                      "position": {
                        "start": {
                          "line": 193,
                          "column": 7,
                          "offset": 5533
                        },
                        "end": {
                          "line": 193,
                          "column": 122,
                          "offset": 5648
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 192,
                      "column": 5,
                      "offset": 5483
                    },
                    "end": {
                      "line": 194,
                      "column": 12,
                      "offset": 5660
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "mask",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "button-mask",
                      "position": {
                        "start": {
                          "line": 195,
                          "column": 11,
                          "offset": 5671
                        },
                        "end": {
                          "line": 195,
                          "column": 27,
                          "offset": 5687
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "rect",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "2",
                          "position": {
                            "start": {
                              "line": 196,
                              "column": 13,
                              "offset": 5701
                            },
                            "end": {
                              "line": 196,
                              "column": 18,
                              "offset": 5706
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "250",
                          "position": {
                            "start": {
                              "line": 196,
                              "column": 19,
                              "offset": 5707
                            },
                            "end": {
                              "line": 196,
                              "column": 26,
                              "offset": 5714
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "rx",
                          "value": "10",
                          "position": {
                            "start": {
                              "line": 196,
                              "column": 27,
                              "offset": 5715
                            },
                            "end": {
                              "line": 196,
                              "column": 34,
                              "offset": 5722
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "ry",
                          "value": "10",
                          "position": {
                            "start": {
                              "line": 196,
                              "column": 35,
                              "offset": 5723
                            },
                            "end": {
                              "line": 196,
                              "column": 42,
                              "offset": 5730
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "width",
                          "value": "50",
                          "position": {
                            "start": {
                              "line": 196,
                              "column": 43,
                              "offset": 5731
                            },
                            "end": {
                              "line": 196,
                              "column": 53,
                              "offset": 5741
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "height",
                          "value": "20",
                          "position": {
                            "start": {
                              "line": 196,
                              "column": 54,
                              "offset": 5742
                            },
                            "end": {
                              "line": 196,
                              "column": 65,
                              "offset": 5753
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "white",
                          "position": {
                            "start": {
                              "line": 196,
                              "column": 66,
                              "offset": 5754
                            },
                            "end": {
                              "line": 196,
                              "column": 78,
                              "offset": 5766
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 196,
                          "column": 7,
                          "offset": 5695
                        },
                        "end": {
                          "line": 196,
                          "column": 81,
                          "offset": 5769
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    },
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "rect",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "60",
                          "position": {
                            "start": {
                              "line": 197,
                              "column": 13,
                              "offset": 5782
                            },
                            "end": {
                              "line": 197,
                              "column": 19,
                              "offset": 5788
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "250",
                          "position": {
                            "start": {
                              "line": 197,
                              "column": 20,
                              "offset": 5789
                            },
                            "end": {
                              "line": 197,
                              "column": 27,
                              "offset": 5796
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "rx",
                          "value": "10",
                          "position": {
                            "start": {
                              "line": 197,
                              "column": 28,
                              "offset": 5797
                            },
                            "end": {
                              "line": 197,
                              "column": 35,
                              "offset": 5804
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "ry",
                          "value": "10",
                          "position": {
                            "start": {
                              "line": 197,
                              "column": 36,
                              "offset": 5805
                            },
                            "end": {
                              "line": 197,
                              "column": 43,
                              "offset": 5812
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "width",
                          "value": "50",
                          "position": {
                            "start": {
                              "line": 197,
                              "column": 44,
                              "offset": 5813
                            },
                            "end": {
                              "line": 197,
                              "column": 54,
                              "offset": 5823
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "height",
                          "value": "20",
                          "position": {
                            "start": {
                              "line": 197,
                              "column": 55,
                              "offset": 5824
                            },
                            "end": {
                              "line": 197,
                              "column": 66,
                              "offset": 5835
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "white",
                          "position": {
                            "start": {
                              "line": 197,
                              "column": 67,
                              "offset": 5836
                            },
                            "end": {
                              "line": 197,
                              "column": 79,
                              "offset": 5848
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 197,
                          "column": 7,
                          "offset": 5776
                        },
                        "end": {
                          "line": 197,
                          "column": 82,
                          "offset": 5851
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 195,
                      "column": 5,
                      "offset": 5665
                    },
                    "end": {
                      "line": 198,
                      "column": 12,
                      "offset": 5863
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                }
              ],
              "position": {
                "start": {
                  "line": 176,
                  "column": 3,
                  "offset": 4330
                },
                "end": {
                  "line": 199,
                  "column": 10,
                  "offset": 5873
                }
              },
              "data": {
                "_mdxExplicitJsx": true
              }
            },
            {
              "type": "mdxJsxFlowElement",
              "name": "g",
              "attributes": [
                {
                  "type": "mdxJsxAttribute",
                  "name": "id",
                  "value": "Ebene_1-2",
                  "position": {
                    "start": {
                      "line": 200,
                      "column": 6,
                      "offset": 5879
                    },
                    "end": {
                      "line": 200,
                      "column": 20,
                      "offset": 5893
                    }
                  }
                }
              ],
              "children": [
                {
                  "type": "mdxJsxFlowElement",
                  "name": "g",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "layer2",
                      "position": {
                        "start": {
                          "line": 201,
                          "column": 8,
                          "offset": 5902
                        },
                        "end": {
                          "line": 201,
                          "column": 19,
                          "offset": 5913
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "circle",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "className",
                          "value": "snek",
                          "position": {
                            "start": {
                              "line": 203,
                              "column": 9,
                              "offset": 5937
                            },
                            "end": {
                              "line": 203,
                              "column": 25,
                              "offset": 5953
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "cx",
                          "value": "238",
                          "position": {
                            "start": {
                              "line": 204,
                              "column": 9,
                              "offset": 5962
                            },
                            "end": {
                              "line": 204,
                              "column": 17,
                              "offset": 5970
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "cy",
                          "value": "238",
                          "position": {
                            "start": {
                              "line": 205,
                              "column": 9,
                              "offset": 5979
                            },
                            "end": {
                              "line": 205,
                              "column": 17,
                              "offset": 5987
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "r",
                          "value": "160",
                          "position": {
                            "start": {
                              "line": 206,
                              "column": 9,
                              "offset": 5996
                            },
                            "end": {
                              "line": 206,
                              "column": 16,
                              "offset": 6003
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "transparent",
                          "position": {
                            "start": {
                              "line": 207,
                              "column": 9,
                              "offset": 6012
                            },
                            "end": {
                              "line": 207,
                              "column": 27,
                              "offset": 6030
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "stroke",
                          "value": "#1A202C",
                          "position": {
                            "start": {
                              "line": 208,
                              "column": 9,
                              "offset": 6039
                            },
                            "end": {
                              "line": 208,
                              "column": 25,
                              "offset": 6055
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeWidth",
                          "value": "54",
                          "position": {
                            "start": {
                              "line": 209,
                              "column": 9,
                              "offset": 6064
                            },
                            "end": {
                              "line": 209,
                              "column": 25,
                              "offset": 6080
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeLinecap",
                          "value": "round",
                          "position": {
                            "start": {
                              "line": 210,
                              "column": 9,
                              "offset": 6089
                            },
                            "end": {
                              "line": 210,
                              "column": 30,
                              "offset": 6110
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "mask",
                          "value": "url(#snek-mask)",
                          "position": {
                            "start": {
                              "line": 211,
                              "column": 9,
                              "offset": 6119
                            },
                            "end": {
                              "line": 211,
                              "column": 31,
                              "offset": 6141
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 202,
                          "column": 7,
                          "offset": 5921
                        },
                        "end": {
                          "line": 212,
                          "column": 9,
                          "offset": 6150
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    },
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "g",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "className",
                          "value": "heart-wrap",
                          "position": {
                            "start": {
                              "line": 213,
                              "column": 10,
                              "offset": 6160
                            },
                            "end": {
                              "line": 213,
                              "column": 32,
                              "offset": 6182
                            }
                          }
                        }
                      ],
                      "children": [
                        {
                          "type": "mdxJsxFlowElement",
                          "name": "rect",
                          "attributes": [
                            {
                              "type": "mdxJsxAttribute",
                              "name": "id",
                              "value": "rect",
                              "position": {
                                "start": {
                                  "line": 215,
                                  "column": 11,
                                  "offset": 6208
                                },
                                "end": {
                                  "line": 215,
                                  "column": 20,
                                  "offset": 6217
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "className",
                              "value": "rect",
                              "position": {
                                "start": {
                                  "line": 216,
                                  "column": 11,
                                  "offset": 6228
                                },
                                "end": {
                                  "line": 216,
                                  "column": 27,
                                  "offset": 6244
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "stroke",
                              "value": "#1A202C",
                              "position": {
                                "start": {
                                  "line": 217,
                                  "column": 11,
                                  "offset": 6255
                                },
                                "end": {
                                  "line": 217,
                                  "column": 27,
                                  "offset": 6271
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "strokeWidth",
                              "value": "1",
                              "position": {
                                "start": {
                                  "line": 218,
                                  "column": 11,
                                  "offset": 6282
                                },
                                "end": {
                                  "line": 218,
                                  "column": 26,
                                  "offset": 6297
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "fill",
                              "value": "transparent",
                              "position": {
                                "start": {
                                  "line": 219,
                                  "column": 11,
                                  "offset": 6308
                                },
                                "end": {
                                  "line": 219,
                                  "column": 29,
                                  "offset": 6326
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "x",
                              "value": "164",
                              "position": {
                                "start": {
                                  "line": 220,
                                  "column": 11,
                                  "offset": 6337
                                },
                                "end": {
                                  "line": 220,
                                  "column": 18,
                                  "offset": 6344
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "y",
                              "value": "214",
                              "position": {
                                "start": {
                                  "line": 221,
                                  "column": 11,
                                  "offset": 6355
                                },
                                "end": {
                                  "line": 221,
                                  "column": 18,
                                  "offset": 6362
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "width",
                              "value": "100",
                              "position": {
                                "start": {
                                  "line": 222,
                                  "column": 11,
                                  "offset": 6373
                                },
                                "end": {
                                  "line": 222,
                                  "column": 22,
                                  "offset": 6384
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "height",
                              "value": "100",
                              "position": {
                                "start": {
                                  "line": 223,
                                  "column": 11,
                                  "offset": 6395
                                },
                                "end": {
                                  "line": 223,
                                  "column": 23,
                                  "offset": 6407
                                }
                              }
                            }
                          ],
                          "children": [

                          ],
                          "position": {
                            "start": {
                              "line": 214,
                              "column": 9,
                              "offset": 6192
                            },
                            "end": {
                              "line": 224,
                              "column": 11,
                              "offset": 6418
                            }
                          },
                          "data": {
                            "_mdxExplicitJsx": true
                          }
                        },
                        {
                          "type": "mdxJsxFlowElement",
                          "name": "circle",
                          "attributes": [
                            {
                              "type": "mdxJsxAttribute",
                              "name": "id",
                              "value": "circle1",
                              "position": {
                                "start": {
                                  "line": 226,
                                  "column": 11,
                                  "offset": 6445
                                },
                                "end": {
                                  "line": 226,
                                  "column": 23,
                                  "offset": 6457
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "className",
                              "value": "circles",
                              "position": {
                                "start": {
                                  "line": 227,
                                  "column": 11,
                                  "offset": 6468
                                },
                                "end": {
                                  "line": 227,
                                  "column": 30,
                                  "offset": 6487
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "stroke",
                              "value": "#1A202C",
                              "position": {
                                "start": {
                                  "line": 228,
                                  "column": 11,
                                  "offset": 6498
                                },
                                "end": {
                                  "line": 228,
                                  "column": 27,
                                  "offset": 6514
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "strokeWidth",
                              "value": "1",
                              "position": {
                                "start": {
                                  "line": 229,
                                  "column": 11,
                                  "offset": 6525
                                },
                                "end": {
                                  "line": 229,
                                  "column": 26,
                                  "offset": 6540
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "fill",
                              "value": "transparent",
                              "position": {
                                "start": {
                                  "line": 230,
                                  "column": 11,
                                  "offset": 6551
                                },
                                "end": {
                                  "line": 230,
                                  "column": 29,
                                  "offset": 6569
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "cx",
                              "value": "214",
                              "position": {
                                "start": {
                                  "line": 231,
                                  "column": 11,
                                  "offset": 6580
                                },
                                "end": {
                                  "line": 231,
                                  "column": 19,
                                  "offset": 6588
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "cy",
                              "value": "264",
                              "position": {
                                "start": {
                                  "line": 232,
                                  "column": 11,
                                  "offset": 6599
                                },
                                "end": {
                                  "line": 232,
                                  "column": 19,
                                  "offset": 6607
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "r",
                              "value": "50",
                              "position": {
                                "start": {
                                  "line": 233,
                                  "column": 11,
                                  "offset": 6618
                                },
                                "end": {
                                  "line": 233,
                                  "column": 17,
                                  "offset": 6624
                                }
                              }
                            }
                          ],
                          "children": [

                          ],
                          "position": {
                            "start": {
                              "line": 225,
                              "column": 9,
                              "offset": 6427
                            },
                            "end": {
                              "line": 234,
                              "column": 11,
                              "offset": 6635
                            }
                          },
                          "data": {
                            "_mdxExplicitJsx": true
                          }
                        },
                        {
                          "type": "mdxJsxFlowElement",
                          "name": "circle",
                          "attributes": [
                            {
                              "type": "mdxJsxAttribute",
                              "name": "id",
                              "value": "circle2",
                              "position": {
                                "start": {
                                  "line": 236,
                                  "column": 11,
                                  "offset": 6662
                                },
                                "end": {
                                  "line": 236,
                                  "column": 23,
                                  "offset": 6674
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "className",
                              "value": "circles",
                              "position": {
                                "start": {
                                  "line": 237,
                                  "column": 11,
                                  "offset": 6685
                                },
                                "end": {
                                  "line": 237,
                                  "column": 30,
                                  "offset": 6704
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "stroke",
                              "value": "#1A202C",
                              "position": {
                                "start": {
                                  "line": 238,
                                  "column": 11,
                                  "offset": 6715
                                },
                                "end": {
                                  "line": 238,
                                  "column": 27,
                                  "offset": 6731
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "strokeWidth",
                              "value": "1",
                              "position": {
                                "start": {
                                  "line": 239,
                                  "column": 11,
                                  "offset": 6742
                                },
                                "end": {
                                  "line": 239,
                                  "column": 26,
                                  "offset": 6757
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "fill",
                              "value": "transparent",
                              "position": {
                                "start": {
                                  "line": 240,
                                  "column": 11,
                                  "offset": 6768
                                },
                                "end": {
                                  "line": 240,
                                  "column": 29,
                                  "offset": 6786
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "cx",
                              "value": "214",
                              "position": {
                                "start": {
                                  "line": 241,
                                  "column": 11,
                                  "offset": 6797
                                },
                                "end": {
                                  "line": 241,
                                  "column": 19,
                                  "offset": 6805
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "cy",
                              "value": "264",
                              "position": {
                                "start": {
                                  "line": 242,
                                  "column": 11,
                                  "offset": 6816
                                },
                                "end": {
                                  "line": 242,
                                  "column": 19,
                                  "offset": 6824
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "r",
                              "value": "50",
                              "position": {
                                "start": {
                                  "line": 243,
                                  "column": 11,
                                  "offset": 6835
                                },
                                "end": {
                                  "line": 243,
                                  "column": 17,
                                  "offset": 6841
                                }
                              }
                            }
                          ],
                          "children": [

                          ],
                          "position": {
                            "start": {
                              "line": 235,
                              "column": 9,
                              "offset": 6644
                            },
                            "end": {
                              "line": 244,
                              "column": 11,
                              "offset": 6852
                            }
                          },
                          "data": {
                            "_mdxExplicitJsx": true
                          }
                        },
                        {
                          "type": "mdxJsxFlowElement",
                          "name": "path",
                          "attributes": [
                            {
                              "type": "mdxJsxAttribute",
                              "name": "id",
                              "value": "heart",
                              "position": {
                                "start": {
                                  "line": 246,
                                  "column": 11,
                                  "offset": 6877
                                },
                                "end": {
                                  "line": 246,
                                  "column": 21,
                                  "offset": 6887
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "className",
                              "value": "heart",
                              "position": {
                                "start": {
                                  "line": 247,
                                  "column": 11,
                                  "offset": 6898
                                },
                                "end": {
                                  "line": 247,
                                  "column": 28,
                                  "offset": 6915
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "stroke",
                              "value": "#f77f00",
                              "position": {
                                "start": {
                                  "line": 248,
                                  "column": 11,
                                  "offset": 6926
                                },
                                "end": {
                                  "line": 248,
                                  "column": 27,
                                  "offset": 6942
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "fill",
                              "value": "transparent",
                              "position": {
                                "start": {
                                  "line": 249,
                                  "column": 11,
                                  "offset": 6953
                                },
                                "end": {
                                  "line": 249,
                                  "column": 29,
                                  "offset": 6971
                                }
                              }
                            },
                            {
                              "type": "mdxJsxAttribute",
                              "name": "d",
                              "value": "M 264.00,214.00\nC 291.61,214.00 314.00,236.39 314.00,264.00\n314.00,291.61 291.61,314.00 264.00,314.00\n264.00,314.00 164.00,314.00 164.00,314.00\n164.00,214.00 164.00,214.00 164.00,214.00\n164.00,186.39 186.39,164.00 214.00,164.00\n241.61,164.00 264.00,186.39 264.00,214.00",
                              "position": {
                                "start": {
                                  "line": 250,
                                  "column": 11,
                                  "offset": 6982
                                },
                                "end": {
                                  "line": 256,
                                  "column": 56,
                                  "offset": 7331
                                }
                              }
                            }
                          ],
                          "children": [

                          ],
                          "position": {
                            "start": {
                              "line": 245,
                              "column": 9,
                              "offset": 6861
                            },
                            "end": {
                              "line": 257,
                              "column": 11,
                              "offset": 7342
                            }
                          },
                          "data": {
                            "_mdxExplicitJsx": true
                          }
                        }
                      ],
                      "position": {
                        "start": {
                          "line": 213,
                          "column": 7,
                          "offset": 6157
                        },
                        "end": {
                          "line": 258,
                          "column": 11,
                          "offset": 7353
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 201,
                      "column": 5,
                      "offset": 5899
                    },
                    "end": {
                      "line": 259,
                      "column": 9,
                      "offset": 7362
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "g",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "mask",
                      "value": "url(#heading1-mask)",
                      "position": {
                        "start": {
                          "line": 260,
                          "column": 8,
                          "offset": 7370
                        },
                        "end": {
                          "line": 260,
                          "column": 34,
                          "offset": 7396
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "rect",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "id",
                          "value": "heading1",
                          "position": {
                            "start": {
                              "line": 262,
                              "column": 9,
                              "offset": 7418
                            },
                            "end": {
                              "line": 262,
                              "column": 22,
                              "offset": 7431
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "-10%",
                          "position": {
                            "start": {
                              "line": 263,
                              "column": 9,
                              "offset": 7440
                            },
                            "end": {
                              "line": 263,
                              "column": 17,
                              "offset": 7448
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "34%",
                          "position": {
                            "start": {
                              "line": 264,
                              "column": 9,
                              "offset": 7457
                            },
                            "end": {
                              "line": 264,
                              "column": 16,
                              "offset": 7464
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "width",
                          "value": "100%",
                          "position": {
                            "start": {
                              "line": 265,
                              "column": 9,
                              "offset": 7473
                            },
                            "end": {
                              "line": 265,
                              "column": 21,
                              "offset": 7485
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "height",
                          "value": "50%",
                          "position": {
                            "start": {
                              "line": 266,
                              "column": 9,
                              "offset": 7494
                            },
                            "end": {
                              "line": 266,
                              "column": 21,
                              "offset": 7506
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "none",
                          "position": {
                            "start": {
                              "line": 267,
                              "column": 9,
                              "offset": 7515
                            },
                            "end": {
                              "line": 267,
                              "column": 20,
                              "offset": 7526
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "stroke",
                          "value": "#1A202C",
                          "position": {
                            "start": {
                              "line": 268,
                              "column": 9,
                              "offset": 7535
                            },
                            "end": {
                              "line": 268,
                              "column": 25,
                              "offset": 7551
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeLinecap",
                          "value": "round",
                          "position": {
                            "start": {
                              "line": 269,
                              "column": 9,
                              "offset": 7560
                            },
                            "end": {
                              "line": 269,
                              "column": 30,
                              "offset": 7581
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeWidth",
                          "value": "10%",
                          "position": {
                            "start": {
                              "line": 270,
                              "column": 9,
                              "offset": 7590
                            },
                            "end": {
                              "line": 270,
                              "column": 26,
                              "offset": 7607
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 261,
                          "column": 7,
                          "offset": 7404
                        },
                        "end": {
                          "line": 271,
                          "column": 9,
                          "offset": 7616
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 260,
                      "column": 5,
                      "offset": 7367
                    },
                    "end": {
                      "line": 272,
                      "column": 9,
                      "offset": 7625
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "g",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "mask",
                      "value": "url(#heading2-mask)",
                      "position": {
                        "start": {
                          "line": 273,
                          "column": 8,
                          "offset": 7633
                        },
                        "end": {
                          "line": 273,
                          "column": 34,
                          "offset": 7659
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "rect",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "id",
                          "value": "heading2",
                          "position": {
                            "start": {
                              "line": 275,
                              "column": 9,
                              "offset": 7679
                            },
                            "end": {
                              "line": 275,
                              "column": 22,
                              "offset": 7692
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "-10%",
                          "position": {
                            "start": {
                              "line": 276,
                              "column": 9,
                              "offset": 7701
                            },
                            "end": {
                              "line": 276,
                              "column": 17,
                              "offset": 7709
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "41%",
                          "position": {
                            "start": {
                              "line": 277,
                              "column": 9,
                              "offset": 7718
                            },
                            "end": {
                              "line": 277,
                              "column": 16,
                              "offset": 7725
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "width",
                          "value": "100%",
                          "position": {
                            "start": {
                              "line": 278,
                              "column": 9,
                              "offset": 7734
                            },
                            "end": {
                              "line": 278,
                              "column": 21,
                              "offset": 7746
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "height",
                          "value": "50%",
                          "position": {
                            "start": {
                              "line": 279,
                              "column": 9,
                              "offset": 7755
                            },
                            "end": {
                              "line": 279,
                              "column": 21,
                              "offset": 7767
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "none",
                          "position": {
                            "start": {
                              "line": 280,
                              "column": 9,
                              "offset": 7776
                            },
                            "end": {
                              "line": 280,
                              "column": 20,
                              "offset": 7787
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "stroke",
                          "value": "#1A202C",
                          "position": {
                            "start": {
                              "line": 281,
                              "column": 9,
                              "offset": 7796
                            },
                            "end": {
                              "line": 281,
                              "column": 25,
                              "offset": 7812
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeLinecap",
                          "value": "round",
                          "position": {
                            "start": {
                              "line": 282,
                              "column": 9,
                              "offset": 7821
                            },
                            "end": {
                              "line": 282,
                              "column": 30,
                              "offset": 7842
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeWidth",
                          "value": "10%",
                          "position": {
                            "start": {
                              "line": 283,
                              "column": 9,
                              "offset": 7851
                            },
                            "end": {
                              "line": 283,
                              "column": 26,
                              "offset": 7868
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 274,
                          "column": 5,
                          "offset": 7665
                        },
                        "end": {
                          "line": 284,
                          "column": 9,
                          "offset": 7877
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 273,
                      "column": 5,
                      "offset": 7630
                    },
                    "end": {
                      "line": 285,
                      "column": 9,
                      "offset": 7886
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "g",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "mask",
                      "value": "url(#dot1-mask)",
                      "position": {
                        "start": {
                          "line": 286,
                          "column": 8,
                          "offset": 7894
                        },
                        "end": {
                          "line": 286,
                          "column": 30,
                          "offset": 7916
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "rect",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "id",
                          "value": "dot1",
                          "position": {
                            "start": {
                              "line": 288,
                              "column": 9,
                              "offset": 7938
                            },
                            "end": {
                              "line": 288,
                              "column": 18,
                              "offset": 7947
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "-10%",
                          "position": {
                            "start": {
                              "line": 289,
                              "column": 9,
                              "offset": 7956
                            },
                            "end": {
                              "line": 289,
                              "column": 17,
                              "offset": 7964
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "34%",
                          "position": {
                            "start": {
                              "line": 290,
                              "column": 9,
                              "offset": 7973
                            },
                            "end": {
                              "line": 290,
                              "column": 16,
                              "offset": 7980
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "width",
                          "value": "100%",
                          "position": {
                            "start": {
                              "line": 291,
                              "column": 9,
                              "offset": 7989
                            },
                            "end": {
                              "line": 291,
                              "column": 21,
                              "offset": 8001
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "height",
                          "value": "50%",
                          "position": {
                            "start": {
                              "line": 292,
                              "column": 9,
                              "offset": 8010
                            },
                            "end": {
                              "line": 292,
                              "column": 21,
                              "offset": 8022
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "none",
                          "position": {
                            "start": {
                              "line": 293,
                              "column": 9,
                              "offset": 8031
                            },
                            "end": {
                              "line": 293,
                              "column": 20,
                              "offset": 8042
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "stroke",
                          "value": "#f77f00",
                          "position": {
                            "start": {
                              "line": 294,
                              "column": 9,
                              "offset": 8051
                            },
                            "end": {
                              "line": 294,
                              "column": 25,
                              "offset": 8067
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeLinecap",
                          "value": "round",
                          "position": {
                            "start": {
                              "line": 295,
                              "column": 9,
                              "offset": 8076
                            },
                            "end": {
                              "line": 295,
                              "column": 30,
                              "offset": 8097
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeWidth",
                          "value": "10%",
                          "position": {
                            "start": {
                              "line": 296,
                              "column": 9,
                              "offset": 8106
                            },
                            "end": {
                              "line": 296,
                              "column": 26,
                              "offset": 8123
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 287,
                          "column": 7,
                          "offset": 7924
                        },
                        "end": {
                          "line": 297,
                          "column": 9,
                          "offset": 8132
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 286,
                      "column": 5,
                      "offset": 7891
                    },
                    "end": {
                      "line": 298,
                      "column": 9,
                      "offset": 8141
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "g",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "mask",
                      "value": "url(#dot2-mask)",
                      "position": {
                        "start": {
                          "line": 299,
                          "column": 8,
                          "offset": 8149
                        },
                        "end": {
                          "line": 299,
                          "column": 30,
                          "offset": 8171
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "rect",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "id",
                          "value": "dot2",
                          "position": {
                            "start": {
                              "line": 301,
                              "column": 9,
                              "offset": 8193
                            },
                            "end": {
                              "line": 301,
                              "column": 18,
                              "offset": 8202
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "-10%",
                          "position": {
                            "start": {
                              "line": 302,
                              "column": 9,
                              "offset": 8211
                            },
                            "end": {
                              "line": 302,
                              "column": 17,
                              "offset": 8219
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "41%",
                          "position": {
                            "start": {
                              "line": 303,
                              "column": 9,
                              "offset": 8228
                            },
                            "end": {
                              "line": 303,
                              "column": 16,
                              "offset": 8235
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "width",
                          "value": "100%",
                          "position": {
                            "start": {
                              "line": 304,
                              "column": 9,
                              "offset": 8244
                            },
                            "end": {
                              "line": 304,
                              "column": 21,
                              "offset": 8256
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "height",
                          "value": "50%",
                          "position": {
                            "start": {
                              "line": 305,
                              "column": 9,
                              "offset": 8265
                            },
                            "end": {
                              "line": 305,
                              "column": 21,
                              "offset": 8277
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "none",
                          "position": {
                            "start": {
                              "line": 306,
                              "column": 9,
                              "offset": 8286
                            },
                            "end": {
                              "line": 306,
                              "column": 20,
                              "offset": 8297
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "stroke",
                          "value": "#f77f00",
                          "position": {
                            "start": {
                              "line": 307,
                              "column": 9,
                              "offset": 8306
                            },
                            "end": {
                              "line": 307,
                              "column": 25,
                              "offset": 8322
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeLinecap",
                          "value": "round",
                          "position": {
                            "start": {
                              "line": 308,
                              "column": 9,
                              "offset": 8331
                            },
                            "end": {
                              "line": 308,
                              "column": 30,
                              "offset": 8352
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeWidth",
                          "value": "10%",
                          "position": {
                            "start": {
                              "line": 309,
                              "column": 9,
                              "offset": 8361
                            },
                            "end": {
                              "line": 309,
                              "column": 26,
                              "offset": 8378
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 300,
                          "column": 7,
                          "offset": 8179
                        },
                        "end": {
                          "line": 310,
                          "column": 9,
                          "offset": 8387
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 299,
                      "column": 5,
                      "offset": 8146
                    },
                    "end": {
                      "line": 311,
                      "column": 9,
                      "offset": 8396
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "line",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "skeleton1",
                      "position": {
                        "start": {
                          "line": 313,
                          "column": 7,
                          "offset": 8413
                        },
                        "end": {
                          "line": 313,
                          "column": 21,
                          "offset": 8427
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "x1",
                      "value": "4px",
                      "position": {
                        "start": {
                          "line": 314,
                          "column": 7,
                          "offset": 8434
                        },
                        "end": {
                          "line": 314,
                          "column": 15,
                          "offset": 8442
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "y1",
                      "value": "215px",
                      "position": {
                        "start": {
                          "line": 315,
                          "column": 7,
                          "offset": 8449
                        },
                        "end": {
                          "line": 315,
                          "column": 17,
                          "offset": 8459
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "x2",
                      "value": "196px",
                      "position": {
                        "start": {
                          "line": 316,
                          "column": 7,
                          "offset": 8466
                        },
                        "end": {
                          "line": 316,
                          "column": 17,
                          "offset": 8476
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "y2",
                      "value": "215px",
                      "position": {
                        "start": {
                          "line": 317,
                          "column": 7,
                          "offset": 8483
                        },
                        "end": {
                          "line": 317,
                          "column": 17,
                          "offset": 8493
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "stroke",
                      "value": "#000",
                      "position": {
                        "start": {
                          "line": 318,
                          "column": 7,
                          "offset": 8500
                        },
                        "end": {
                          "line": 318,
                          "column": 20,
                          "offset": 8513
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "opacity",
                      "value": {
                        "type": "mdxJsxAttributeValueExpression",
                        "value": "0.2",
                        "data": {
                          "estree": {
                            "type": "Program",
                            "start": 8529,
                            "end": 8532,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "expression": {
                                  "type": "Literal",
                                  "start": 8529,
                                  "end": 8532,
                                  "loc": {
                                    "start": {
                                      "line": 319,
                                      "column": 15,
                                      "offset": 8529
                                    },
                                    "end": {
                                      "line": 319,
                                      "column": 18,
                                      "offset": 8532
                                    }
                                  },
                                  "value": 0.2,
                                  "raw": "0.2",
                                  "range": [
                                    8529,
                                    8532
                                  ]
                                },
                                "start": 8529,
                                "end": 8532,
                                "loc": {
                                  "start": {
                                    "line": 319,
                                    "column": 15,
                                    "offset": 8529
                                  },
                                  "end": {
                                    "line": 319,
                                    "column": 18,
                                    "offset": 8532
                                  }
                                },
                                "range": [
                                  8529,
                                  8532
                                ]
                              }
                            ],
                            "sourceType": "module",
                            "comments": [

                            ],
                            "loc": {
                              "start": {
                                "line": 319,
                                "column": 15,
                                "offset": 8529
                              },
                              "end": {
                                "line": 319,
                                "column": 18,
                                "offset": 8532
                              }
                            },
                            "range": [
                              8529,
                              8532
                            ]
                          }
                        }
                      },
                      "position": {
                        "start": {
                          "line": 319,
                          "column": 7,
                          "offset": 8520
                        },
                        "end": {
                          "line": 319,
                          "column": 20,
                          "offset": 8533
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "strokeLinecap",
                      "value": "round",
                      "position": {
                        "start": {
                          "line": 320,
                          "column": 7,
                          "offset": 8540
                        },
                        "end": {
                          "line": 320,
                          "column": 28,
                          "offset": 8561
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "strokeWidth",
                      "value": "8px",
                      "position": {
                        "start": {
                          "line": 321,
                          "column": 7,
                          "offset": 8568
                        },
                        "end": {
                          "line": 321,
                          "column": 24,
                          "offset": 8585
                        }
                      }
                    }
                  ],
                  "children": [

                  ],
                  "position": {
                    "start": {
                      "line": 312,
                      "column": 5,
                      "offset": 8401
                    },
                    "end": {
                      "line": 322,
                      "column": 7,
                      "offset": 8592
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "line",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "id",
                      "value": "skeleton2",
                      "position": {
                        "start": {
                          "line": 324,
                          "column": 7,
                          "offset": 8609
                        },
                        "end": {
                          "line": 324,
                          "column": 21,
                          "offset": 8623
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "x1",
                      "value": "4px",
                      "position": {
                        "start": {
                          "line": 325,
                          "column": 7,
                          "offset": 8630
                        },
                        "end": {
                          "line": 325,
                          "column": 15,
                          "offset": 8638
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "y1",
                      "value": "230px",
                      "position": {
                        "start": {
                          "line": 326,
                          "column": 7,
                          "offset": 8645
                        },
                        "end": {
                          "line": 326,
                          "column": 17,
                          "offset": 8655
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "x2",
                      "value": "196px",
                      "position": {
                        "start": {
                          "line": 327,
                          "column": 7,
                          "offset": 8662
                        },
                        "end": {
                          "line": 327,
                          "column": 17,
                          "offset": 8672
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "y2",
                      "value": "230px",
                      "position": {
                        "start": {
                          "line": 328,
                          "column": 7,
                          "offset": 8679
                        },
                        "end": {
                          "line": 328,
                          "column": 17,
                          "offset": 8689
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "stroke",
                      "value": "#000",
                      "position": {
                        "start": {
                          "line": 329,
                          "column": 7,
                          "offset": 8696
                        },
                        "end": {
                          "line": 329,
                          "column": 20,
                          "offset": 8709
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "opacity",
                      "value": {
                        "type": "mdxJsxAttributeValueExpression",
                        "value": "0.2",
                        "data": {
                          "estree": {
                            "type": "Program",
                            "start": 8725,
                            "end": 8728,
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "expression": {
                                  "type": "Literal",
                                  "start": 8725,
                                  "end": 8728,
                                  "loc": {
                                    "start": {
                                      "line": 330,
                                      "column": 15,
                                      "offset": 8725
                                    },
                                    "end": {
                                      "line": 330,
                                      "column": 18,
                                      "offset": 8728
                                    }
                                  },
                                  "value": 0.2,
                                  "raw": "0.2",
                                  "range": [
                                    8725,
                                    8728
                                  ]
                                },
                                "start": 8725,
                                "end": 8728,
                                "loc": {
                                  "start": {
                                    "line": 330,
                                    "column": 15,
                                    "offset": 8725
                                  },
                                  "end": {
                                    "line": 330,
                                    "column": 18,
                                    "offset": 8728
                                  }
                                },
                                "range": [
                                  8725,
                                  8728
                                ]
                              }
                            ],
                            "sourceType": "module",
                            "comments": [

                            ],
                            "loc": {
                              "start": {
                                "line": 330,
                                "column": 15,
                                "offset": 8725
                              },
                              "end": {
                                "line": 330,
                                "column": 18,
                                "offset": 8728
                              }
                            },
                            "range": [
                              8725,
                              8728
                            ]
                          }
                        }
                      },
                      "position": {
                        "start": {
                          "line": 330,
                          "column": 7,
                          "offset": 8716
                        },
                        "end": {
                          "line": 330,
                          "column": 20,
                          "offset": 8729
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "strokeLinecap",
                      "value": "round",
                      "position": {
                        "start": {
                          "line": 331,
                          "column": 7,
                          "offset": 8736
                        },
                        "end": {
                          "line": 331,
                          "column": 28,
                          "offset": 8757
                        }
                      }
                    },
                    {
                      "type": "mdxJsxAttribute",
                      "name": "strokeWidth",
                      "value": "8px",
                      "position": {
                        "start": {
                          "line": 332,
                          "column": 7,
                          "offset": 8764
                        },
                        "end": {
                          "line": 332,
                          "column": 24,
                          "offset": 8781
                        }
                      }
                    }
                  ],
                  "children": [

                  ],
                  "position": {
                    "start": {
                      "line": 323,
                      "column": 5,
                      "offset": 8597
                    },
                    "end": {
                      "line": 333,
                      "column": 7,
                      "offset": 8788
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                },
                {
                  "type": "mdxJsxFlowElement",
                  "name": "g",
                  "attributes": [
                    {
                      "type": "mdxJsxAttribute",
                      "name": "mask",
                      "value": "url(#button-mask)",
                      "position": {
                        "start": {
                          "line": 334,
                          "column": 8,
                          "offset": 8796
                        },
                        "end": {
                          "line": 334,
                          "column": 32,
                          "offset": 8820
                        }
                      }
                    }
                  ],
                  "children": [
                    {
                      "type": "mdxJsxFlowElement",
                      "name": "rect",
                      "attributes": [
                        {
                          "type": "mdxJsxAttribute",
                          "name": "id",
                          "value": "button",
                          "position": {
                            "start": {
                              "line": 336,
                              "column": 9,
                              "offset": 8842
                            },
                            "end": {
                              "line": 336,
                              "column": 20,
                              "offset": 8853
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "x",
                          "value": "-10%",
                          "position": {
                            "start": {
                              "line": 337,
                              "column": 9,
                              "offset": 8862
                            },
                            "end": {
                              "line": 337,
                              "column": 17,
                              "offset": 8870
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "y",
                          "value": "57%",
                          "position": {
                            "start": {
                              "line": 338,
                              "column": 9,
                              "offset": 8879
                            },
                            "end": {
                              "line": 338,
                              "column": 16,
                              "offset": 8886
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "width",
                          "value": "100%",
                          "position": {
                            "start": {
                              "line": 339,
                              "column": 9,
                              "offset": 8895
                            },
                            "end": {
                              "line": 339,
                              "column": 21,
                              "offset": 8907
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "height",
                          "value": "50%",
                          "position": {
                            "start": {
                              "line": 340,
                              "column": 9,
                              "offset": 8916
                            },
                            "end": {
                              "line": 340,
                              "column": 21,
                              "offset": 8928
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "fill",
                          "value": "none",
                          "position": {
                            "start": {
                              "line": 341,
                              "column": 9,
                              "offset": 8937
                            },
                            "end": {
                              "line": 341,
                              "column": 20,
                              "offset": 8948
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "stroke",
                          "value": "#f77f00",
                          "position": {
                            "start": {
                              "line": 342,
                              "column": 9,
                              "offset": 8957
                            },
                            "end": {
                              "line": 342,
                              "column": 25,
                              "offset": 8973
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeLinecap",
                          "value": "round",
                          "position": {
                            "start": {
                              "line": 343,
                              "column": 9,
                              "offset": 8982
                            },
                            "end": {
                              "line": 343,
                              "column": 30,
                              "offset": 9003
                            }
                          }
                        },
                        {
                          "type": "mdxJsxAttribute",
                          "name": "strokeWidth",
                          "value": "10%",
                          "position": {
                            "start": {
                              "line": 344,
                              "column": 9,
                              "offset": 9012
                            },
                            "end": {
                              "line": 344,
                              "column": 26,
                              "offset": 9029
                            }
                          }
                        }
                      ],
                      "children": [

                      ],
                      "position": {
                        "start": {
                          "line": 335,
                          "column": 7,
                          "offset": 8828
                        },
                        "end": {
                          "line": 345,
                          "column": 9,
                          "offset": 9038
                        }
                      },
                      "data": {
                        "_mdxExplicitJsx": true
                      }
                    }
                  ],
                  "position": {
                    "start": {
                      "line": 334,
                      "column": 5,
                      "offset": 8793
                    },
                    "end": {
                      "line": 346,
                      "column": 9,
                      "offset": 9047
                    }
                  },
                  "data": {
                    "_mdxExplicitJsx": true
                  }
                }
              ],
              "position": {
                "start": {
                  "line": 200,
                  "column": 3,
                  "offset": 5876
                },
                "end": {
                  "line": 347,
                  "column": 7,
                  "offset": 9054
                }
              },
              "data": {
                "_mdxExplicitJsx": true
              }
            }
          ],
          "position": {
            "start": {
              "line": 1,
              "column": 1,
              "offset": 0
            },
            "end": {
              "line": 348,
              "column": 7,
              "offset": 9061
            }
          },
          "data": {
            "_mdxExplicitJsx": true
          }
        }
      ],
      "position": {
        "start": {
          "line": 1,
          "column": 1,
          "offset": 0
        },
        "end": {
          "line": 348,
          "column": 7,
          "offset": 9061
        }
      }
    }
  ),
})
