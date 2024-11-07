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

> ## Total Revenue and Pending payments
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/admin/revenue`
- **_method:_** `GET`

> > **response**

- **_status code_**: `200`
- **_response body_**:

- ```json
  {
    "revenue": {
      "$numberDecimal": "3"
    },
    "pending": 7
  }
  ```

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
  >
  > > **request**

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
- **_method:_** `POST`
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

# Government Agent

> ## Account Summary
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/agent/summary`
- **_method:_** `GET`

> > **response**

- **_status code_**: `200`
- **_response body_**:

- ```json
  [
    {
      "totalUnpaidAmount": {
        "$numberDecimal": "9"
      },
      "saccosWithUnpaidDues": 2,
      "pending": 9
    }
  ]
  ```

> ## Saccos Summary (**_those with debts_**)
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/agent/saccos/summary`
- **_method:_** `GET`

> > **response**

- **_status code_**: `200`
- **_response body_**:

- ```json
  [
    {
      "pending": {
        "$numberDecimal": "1"
      },
      "email": "omoshjoe02@gmail.com",
      "name": "Fred sacco"
    },
    {
      "pending": {
        "$numberDecimal": "8"
      },
      "email": "test@gmail.com",
      "name": "Sacco 2"
    }
  ]
  ```

  > ## Failed Transactions Per Sacco
  >
  > > **request**

- **_url_**: `{{base_url}}/api/v1/agent/saccos/summary`
- **_method:_** `POST`
- **_headers:_**:
  - Content-Type: `application/json`
- **_request body:_**

```json
{
  "email": "test@gmail.com"
}
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

```json
[
  {
    "number_plate": "KBH124H",
    "amount": {
      "$numberDecimal": "1"
    },
    "status": "failed",
    "narrative": "Tax",
    "trans_type": "PAYOUT",
    "createdAt": "2024-10-31T04:49:34.567Z", # Time at which transaction took place
  },
]
```

# Sacco

> ## Account Summary
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/sacco/summary`
- **_method:_** `GET`
- **_headers:_**:
  - Content-Type: `application/json`
- **_request body:_**

```json
{
  "email": "test@gmail.com"
}
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

```json
{
  "current_balance": 0,
  "totalUnpaid": {
    "$numberDecimal": "1"
  },
  "pending": 1
}
```

> ## TopUp Sacco Account
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/sacco/topup`
- **_method:_** `POST`
- **_headers:_**:
  - Content-Type: `application/json`
- **_request body:_**

```json
{
  "email": "test@gmail.com",
  "amount": 1,
  "phone_number": "254743596183"
}
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

```json
{
  "status": "success",
  "message": "Your request have been received for processing"
}
```

> ## TopUp History
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/sacco/topup/history`
- **_method:_** `POST`
- **_headers:_**:
  - Content-Type: `application/json`
- **_request body:_**

```json
{
  "email": "test@gmail.com"
}
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

```json
{
  "count": 8,
  "results": [
    {
      "transaction_id": "QW4864Y",
      "invoice": null,
      "currency": "KES",
      "value": -0.03,
      "running_balance": 1.94,
      "narrative": "M-Pesa payment fee",
      "trans_type": "CHARGE",
      "status": "AVAILABLE",
      "created_at": "2024-11-06T07:42:51.029515+03:00",
      "updated_at": "2024-11-06T07:42:51.067307+03:00"
    }
  ]
}
```

> ## Transaction Logs
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/sacco/transactions/history`
- **_method:_** `POST`
- **_headers:_**:
  - Content-Type: `application/json`
- **_request body:_**

```json
{
  "email": "test@gmail.com"
}
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

```json
[
  {
    "email": "antonygichoya9@gmail.com",
    "number_plate": "KBH124H",
    "amount": {
      "$numberDecimal": "1"
    },
    "status": "failed",
    "narrative": "Tax",
    "createdAt": "2024-11-06T02:10:24.978Z" # latest transaction
  },
]
```

> ## Sensor Logs
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/sacco/sensor/history`
- **_method:_** `POST`
- **_headers:_**:
  - Content-Type: `application/json`
- **_request body:_**

```json
{
  "email": "test@gmail.com"
}
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

```json
[
  {
    "number_plate": "KBH124H",
    "destination": "Kakamega",
    "createdAt": "2024-11-06T02:10:24.132Z"
  },
]
```
