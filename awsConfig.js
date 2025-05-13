import AWS from "aws-sdk";

AWS.util.date.getDate = () => new Date();

AWS.config.update({
    accessKeyId: "ASIA52SJ4SBDFVPWLPCI",
    secretAccessKey: "3w3vkTSLcUpHre3rHo495x5nQiD6XS+f1RcF8gIk",
    sessionToken: "IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQD15waVY/NANsGlUqN+ERIernU6IyegRk+GDClAM62czgIhAPtUAzvi2jOP0whNBXhLaPBHsi7oFjDFnoB24hssBi+rKrkCCO///////////wEQABoMOTUwNDE2NDc4Mjc4IgwWTNQkuvYUb+Z/NqEqjQIoF7xkc5Qqk2W3m3y0kEffcrESSOEhUuarb5vQn7ji+/AxkooWlCG8tLCSE36Arhn0Vrclt7blzklVFCzgYpsG5ZhRaCbTUMlSRhKbBe+aICI+0ql8YV3lpJKI4faEnjKYEYSJhNrwCuqusNmvPmgIryqlEZQe97671bxbrwau9kgsH50+JyaTLpe7901PRcTEQL/4kDzTC4EFYs+Frw+OXKGyi4/pRcRlMsXWvE/UNKOrVcrBm8OcC6UuyA1DlkrqSN5srRF/PFfNqgj2ZAKypC/9d1uNTjkPx5XQffayobTKPP7hOJJltP2J8yNHUHgu24zaQ6B/PW98CgATaG1cOMnhubcxHodEwYZWhTCxqI3BBjqcATJwZMxbiwNEr/RBHUVKG8EzZdzP+XN39OTd1r+vtQduYyQhJqmhzZWvqgx+A9vMWdRfDJgEdryPQGhMmHjjIZMwblPnUdgHIFOwpJ919AuwYa6WKFdcQ35dqkMkc+A7Ef63tDKvg7olELtWjtyVgtQChAhJt5BXHGicg2lvdDOQFWGFP2NIyrnXqx29wSlBr6IOSvt8ekReIMEXZA==",
    region: "us-east-1",
});

const s3 = new AWS.S3();

export default s3;