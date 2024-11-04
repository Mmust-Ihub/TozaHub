<div align="center">

# Payments

<p> The payment service for the TozaHub project </p>

**Things to take note of:**

#### base_url: http://164.92.165.41

</div>

## Table Of Contents

1. [Admin](#admin)
2. [Government Agent](#government-agent)
3. [Sacco](#sacco)

# Admin

> ## Account Summary
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/admin/summary`
- **_method:_** `GET`

- **_Required query parameters:_**

  | Parameter  |  Type  |                        Options                         |
  | :--------: | :----: | :----------------------------------------------------: |
  |  interval  | string | **_daily_**, **_weekly_**, **_monthly_**, **_yearly_** |
  | start_date | string |    **_should stricly correspond to the interval_**     |
  |  end_date  | string |    **_should stricly correspond to the interval_**     |

- **_example url_** :

```yaml
url: /api/v1/admin/summary?interval=daily&start_date=2024-10-29&end_date=2024-10-30
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

- ```json
  [
    {
      "_id": {
        "year": 2024,
        "month": 10,
        "day": 29
      },
      "total_transactions": 3,
      "successful_transactions": 1,
      "pending_transactions": 2,
      "total_amount_collected": {
        "$numberDecimal": "1"
      }
    }
  ]
  ```
> ## Account Balance
  >> **request**

- **_url_**: `{{base_url}}/api/v1/admin/balance`
- **_method:_** `GET`

> > **response**

- **_status code_**: `200`
- **_response body_**:

- ```json
  {
    "current_balance": 202.87
  }
  ```

> ## Withdraw
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/admin/withdraw`
- **_method:_** `GET`
- **_request body:_**

```json
{
  "phone_number": "254743596183",
  "amount": 1
}
```

> > **response**

- **_status code_**: `200`
- **_response body_**:


#  Government Agent
> ## Account Summary
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/admin/summary`
- **_method:_** `GET`

- **_Required query parameters:_**

  | Parameter  |  Type  |                        Options                         |
  | :--------: | :----: | :----------------------------------------------------: |
  |  interval  | string | **_daily_**, **_weekly_**, **_monthly_**, **_yearly_** |
  | start_date | string |    **_should stricly correspond to the interval_**     |
  |  end_date  | string |    **_should stricly correspond to the interval_**     |

- **_example url_** :

```yaml
url: /api/v1/admin/summary?interval=daily&start_date=2024-10-29&end_date=2024-10-30
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

- ```json
  [
    {
      "_id": {
        "year": 2024,
        "month": 10,
        "day": 29
      },
      "total_transactions": 3,
      "successful_transactions": 1,
      "pending_transactions": 2,
      "total_amount_collected": {
        "$numberDecimal": "1"
      }
    }
  ]
  ```


# Sacco

## create an event

> **request**

- url: `{{base_url}}/api/v1/events`
- method: `POST`
- Authorization: `Bearer token`
- request body:
  ```json
  "title": "The title of the event",
  "short_description": "The short description to be displayed",
  "long_description": "A more detailed info about the event",
  "start_date": "YYYY-MM-DD should be in this form",
  "tags": ["Hackathon", "Community"]
  "event_link": "The link for the event registration"
  "image": "The image file fo the event"
  ```
  > **Response**
- status code: `201`
- response body:
  ```json
  { "status": "success", "message": "project created successfully" }
  ```

## Get upcoming events (with pagination features)

> **request**

- **_url_**: `{{base_url}}/api/v1/events/upcoming`
- **_method:_** `GET`

- **_Headers:_**

  - `Content-Type: application/json`

- **_Optional query parameters:_**

| Parameter |  Type   | Default |
| :-------: | :-----: | :-----: |
|   page    | integer |    0    |
|  perPage  | integer |    5    |

> **Response**

- status code: `200`
- response body:
  ```json
  [
    {
      "_id": "66f50c1f3a0238ca38255a6b",
      "title": "Voluptatem eaque ipsam.",
      "slug": "Voluptatem-eaque-ipsam.",
      "short_description": "Dolor enim odio et laudantium enim ducimus facere aspernatur. Quae aut a error atque harum dolores distinctio.",
      "long_description": "Libero voluptatibus inventore autem eum.",
      "start_date": "2024-06-24T10:28:54.000Z",
      "end_date": "2024-12-08T23:48:19.000Z",
      "tags": ["community", "event"],
      "event_type": "in-person",
      "image_url": "https://image.localhost",
      "event_link": "https://aisha.com",
      "createdBy": "66f156c5c3d424e6edfc38d0",
      "__v": 0
    }
  ]
  ```

## Get past events (with pagination features)

> **request**

- **_url_**: `{{base_url}}/api/v1/events/past`
- **_method:_** `GET`

- **_Headers:_**

  - `Content-Type: application/json`

- **_Optional query parameters:_**

| Parameter |  Type   | Default |
| :-------: | :-----: | :-----: |
|   page    | integer |    0    |
|  perPage  | integer |    5    |

> **Response**

- status code: `200`
- response body:
  ```json
  [
    {
      "_id": "66f50c1f3a0238ca38255a6b",
      "title": "Voluptatem eaque ipsam.",
      "slug": "Voluptatem-eaque-ipsam.",
      "short_description": "Dolor enim odio et laudantium enim ducimus facere aspernatur. Quae aut a error atque harum dolores distinctio.",
      "long_description": "Libero voluptatibus inventore autem eum.",
      "start_date": "2024-06-24T10:28:54.000Z",
      "end_date": "2024-12-08T23:48:19.000Z",
      "tags": ["community", "event"],
      "event_type": "in-person",
      "image_url": "https://image.localhost",
      "event_link": "https://aisha.com",
      "createdBy": "66f156c5c3d424e6edfc38d0",
      "__v": 0
    }
  ]
  ```

## Get past events (with pagination features)

> **request**

- **_url_**: `{{base_url}}/api/v1/events/past`
- **_method:_** `GET`

- **_Headers:_**

  - `Content-Type: application/json`

- **_Optional query parameters:_**

| Parameter |  Type   | Default |
| :-------: | :-----: | :-----: |
|   page    | integer |    0    |
|  perPage  | integer |    5    |

> **Response**

- status code: `200`
- response body:
  ```json
  [
    {
      "_id": "66f50c1f3a0238ca38255a6b",
      "title": "Voluptatem eaque ipsam.",
      "slug": "Voluptatem-eaque-ipsam.",
      "short_description": "Dolor enim odio et laudantium enim ducimus facere aspernatur. Quae aut a error atque harum dolores distinctio.",
      "long_description": "Libero voluptatibus inventore autem eum.",
      "start_date": "2024-06-24T10:28:54.000Z",
      "end_date": "2024-12-08T23:48:19.000Z",
      "tags": ["community", "event"],
      "event_type": "in-person",
      "image_url": "https://image.localhost",
      "event_link": "https://aisha.com",
      "createdBy": "66f156c5c3d424e6edfc38d0",
      "__v": 0
    }
  ]
  ```

## Get a single Event

> **request**

- **_url_**: `{{base_url}}/api/v1/events/details/{slug}`
- **_method:_** `GET`

- **_Headers:_**

  - `Content-Type: application/json`

> **Response**

- status code: `200`
- response body:
  ```json
  {
    "_id": "66f50c1f3a0238ca38255a6b",
    "title": "Voluptatem eaque ipsam.",
    "slug": "Voluptatem-eaque-ipsam.",
    "short_description": "Dolor enim odio et laudantium enim ducimus facere aspernatur. Quae aut a error atque harum dolores distinctio.",
    "long_description": "Libero voluptatibus inventore autem eum. Iure aspernatur sint quisquam. Vitae officiis sed et earum maiores. Cum nulla et voluptates rem iste aut aut.",
    "start_date": "2024-06-24T10:28:54.000Z",
    "end_date": "2024-12-08T23:48:19.000Z",
    "tags": ["community", "event"],
    "event_type": "in-person",
    "image_url": "https://image.localhost",
    "event_link": "https://aisha.com",
    "createdBy": "66f156c5c3d424e6edfc38d0",
    "__v": 0
  }
  ```